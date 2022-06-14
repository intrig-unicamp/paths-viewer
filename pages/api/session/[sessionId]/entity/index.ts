import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../../../../config/firebase";
import { IEntity } from "../../../../../models/IEntity";

const EntityApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;
  const { sessionId } = query;

  try {
    if (["POST", "GET"].indexOf(method ?? "") === -1) {
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    } else {
      if (!sessionId) {
        res.status(400).json({
          statusCode: 400,
          message: "Param sessionId was not sent.",
        });
      } else {
        if (method === "POST") {
          const { statusCode, id, message } = await createEntity(
            String(sessionId),
            body
          );
          res.status(statusCode).send({ statusCode, message, id });
        } else if (method === "GET") {
          if (!sessionId) {
            res.status(400).json({
              statusCode: 400,
              message: "Param sessionId was not sent.",
            });
          } else {
            const { statusCode, data } = await getEntities(sessionId);
            res.status(statusCode).send({ statusCode, entities: data });
          }
        }
      }
    }
  } catch (err) {
    const message = "Error while creating entity.";
    console.error(message, err);
    res.status(500).json({ statusCode: 500, message });
  }
};

export default EntityApi;

const getEntities = async (
  sessionId
): Promise<{ statusCode: number; data?: IEntity[]; message?: string }> => {
  try {
    const db = admin.firestore();
    const entitiesRef = db.collection(`sessions/${sessionId}/entities/`);
    const entities = await entitiesRef.get();

    return {
      statusCode: 200,
      data: entities.docs.map((entity) => entity.data() as IEntity),
    };
  } catch (err) {
    const message = "Error while getting entities.";
    console.error(message, err);
    return { statusCode: 400, message };
  }
};

export const createEntity = async (
  sessionId: string,
  body: Partial<IEntity>
): Promise<{ statusCode: number; message: string; id?: string }> => {
  const { id } = body;
  try {
    const db = admin.firestore();
    const entitiesRef = db.collection(`sessions/${sessionId}/entities`);
    const entities = await entitiesRef.get();
    const entityId = id ?? String(entities.size + 1);

    entitiesRef.doc(entityId.toString()).create({ ...body, id: entityId });

    return {
      statusCode: 201,
      message: `Entity ${entityId} succesfully added to session ${sessionId}`,
      id: entityId,
    };
  } catch (err) {
    const message = "Error while creating entity.";
    console.error(message, err);
    return { statusCode: 400, message };
  }
};
