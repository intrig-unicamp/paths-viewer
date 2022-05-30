import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../../config/firebase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = admin.firestore();
  const { method } = req;

  try {
    if (method == "POST") {
      const id = new Date().valueOf().toString();
      await db.doc(`sessions/${id}`).create({});
      res.status(200).json({ id });
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};
