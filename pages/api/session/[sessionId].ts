import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../../config/firebase";
import { ICoordinatesData } from "../../../models/ICoordinatesData";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = admin.firestore();
  const { method, query, body } = req;

  try {
    if (method == "PUT") {
      const { sessionId } = query;
      const docRef = db.doc(`sessions/${sessionId}`);

      try {
        await db.runTransaction(async (transaction) => {
          const snapshot = await transaction.get(docRef);
          const coordinates = docRef.collection("coordinates");
          const coordinatesData = body as ICoordinatesData;
          const coordinatesRef = coordinates.doc(
            `${coordinatesData.date}T${coordinatesData.time}`
          );
          await transaction.create(coordinatesRef, coordinatesData);
        });
        res.status(200).json({ id: docRef.id });
      } catch (err) {
        console.error(
          `Error while adding coordinate to session ${sessionId}.`,
          err
        );
        res.status(500).json({ statusCode: 500, message: err.message });
      }
    } else {
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};
