import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../../config/firebase";
import { ICoordinatesData } from "../../../models/ICoordinatesData";

const SessionApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;

  try {
    if (method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    } else {
      const { sessionId } = query;
      if (!sessionId) {
        res.status(400).json({
          statusCode: 400,
          message: "Param sessionId was not sent.",
        });
      } else {
        const { statusCode, message } = await addCoordinateToSession(
          String(sessionId),
          body
        );
        res.status(statusCode).send({ statusCode, message });
      }
    }
  } catch (err) {
    const message = "Error while creating session.";
    console.error(message, err);
    res.status(500).json({ statusCode: 500, message });
  }
};

export default SessionApi;

const addCoordinateToSession = async (
  sessionId: string,
  coordinatesData: ICoordinatesData
): Promise<{ statusCode: number; message: string }> => {
  try {
    const db = admin.firestore();
    const docRef = db.doc(`sessions/${sessionId}`);

    await db.runTransaction(async (transaction) => {
      const coordinates = docRef.collection("coordinates");
      const coordinatesRef = coordinates.doc(
        `${coordinatesData.date}T${coordinatesData.time}`
      );
      transaction.create(coordinatesRef, coordinatesData);
    });

    return {
      statusCode: 200,
      message: `Coordinate ${coordinatesData.latitude},${coordinatesData.longitude} succesfully added to session ${sessionId}`,
    };
  } catch (err: any) {
    const FirestoreErrorCodeAlreadyExists = 6;
    if (err.code === FirestoreErrorCodeAlreadyExists) {
      const message = "Once one coordinate is allowed for each date and time.";
      console.error(message, err);
      return { statusCode: 400, message };
    }
    const message = `Error while adding coordinate to session ${sessionId}.`;
    console.error(message, err);
    return { statusCode: 500, message };
  }
};
