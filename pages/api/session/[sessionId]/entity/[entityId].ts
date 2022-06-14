import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../../../../config/firebase";
import { IEntity } from "../../../../../models/IEntity";

const EntityApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;
  const { entityId, sessionId } = query;

  try {
    if (["PUT", "GET"].indexOf(method ?? "") === -1) {
      res.setHeader("Allow", ["PUT", "GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    } else {
      if (!sessionId) {
        res.status(400).json({
          statusCode: 400,
          message: "Param sessionId was not sent.",
        });
      } else {
        if (method === "PUT") {
          if (!sessionId) {
            res.status(400).json({
              statusCode: 400,
              message: "Param sessionId was not sent.",
            });
          } else if (!entityId) {
            res.status(400).json({
              statusCode: 400,
              message: "Param entityId was not sent.",
            });
          } else {
            const { statusCode, message } = await updateEntity(
              String(sessionId),
              String(entityId),
              body
            );
            res.status(statusCode).send({ statusCode, message });
          }
        } else if (method === "GET") {
          if (!sessionId) {
            res.status(400).json({
              statusCode: 400,
              message: "Param sessionId was not sent.",
            });
          } else {
            const { statusCode, data, message } = await getEntity(
              String(sessionId),
              String(entityId)
            );
            res.status(statusCode).send({ statusCode, entity: data, message });
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

export const getEntity = async (
  sessionId: string,
  entityId: string
): Promise<{ statusCode: number; message?: string; data?: IEntity }> => {
  try {
    const db = admin.firestore();
    const entityRef = db.doc(`sessions/${sessionId}/entities/${entityId}`);
    const entity = await entityRef.get();

    if (!entity.exists) {
      const message = `Entity ${entityId} not found.`;
      console.error(message);
      return { statusCode: 404, message };
    } else {
      entity.data;
    }

    return {
      statusCode: 200,
      data: entity.data() as IEntity,
    };
  } catch (err) {
    const message = "Error while updating entity.";
    console.error(message, err);
    return { statusCode: 400, message };
  }
};

const updateEntity = async (
  sessionId: string,
  entityId: string,
  body: IEntity
): Promise<{ statusCode: number; message: string }> => {
  try {
    const db = admin.firestore();
    const entityRef = db.doc(`sessions/${sessionId}/entities/${entityId}`);
    const entity = await entityRef.get();

    if (!entity.exists) {
      const message = `Entity ${entityId} not found.`;
      console.error(message);
      return { statusCode: 404, message };
    } else {
      await entityRef.update(body);
    }

    return {
      statusCode: 200,
      message: `Entity ${entityId} succesfully updated.`,
    };
  } catch (err) {
    const message = "Error while updating entity.";
    console.error(message, err);
    return { statusCode: 400, message };
  }
};
