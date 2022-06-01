import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../../config/firebase";

const SessionApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  try {
    if (method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    } else {
      try {
        const id = await createSession();
        res.status(200).json({ id });
      } catch (err: any) {
        res.status(500).send({ statusCode: 500, message: err.message });
      }
    }
  } catch (err) {
    const message = "Error while creating session.";
    console.error(message, err);
    res.status(500).json({ statusCode: 500, message });
  }
};

export default SessionApi;

const createSession = async (): Promise<string | undefined> => {
  const id = new Date().valueOf().toString();

  try {
    const db = admin.firestore();
    await db.doc(`sessions/${id}`).create({});
    return id;
  } catch (err) {
    const message = "Error while creating session.";
    console.error(message, err);
    throw new Error(message);
  }
};
