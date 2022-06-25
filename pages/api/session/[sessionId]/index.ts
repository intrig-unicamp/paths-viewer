import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../../../config/firebase";
import { ICoordinatesData } from "../../../../models/ICoordinatesData";
import { CustomError, ErrorCode } from "../../../../utils/error";
import { createEntity } from "./entity";
import { getEntity } from "./entity/[entityId]";

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
        const { statusCode, message } = await handleRequest(sessionId, body);
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

const handleRequest = async (
  sessionId,
  body
): Promise<{ statusCode: number; message: string }> => {
  const { coordinates } = body;

  if (!!coordinates && Array.isArray(coordinates) && coordinates.length > 0) {
    return await addManyCoordinatesToSession(String(sessionId), coordinates);
  } else {
    return await addCoordinateToSession(String(sessionId), body);
  }
};

const storeCoordinatesData = async (
  sessionId: string,
  coordinatesData: ICoordinatesData
): Promise<void> => {
  const db = admin.firestore();
  const sessionRef = db.doc(`sessions/${sessionId}`);

  await db.runTransaction(async (transaction) => {
    const coordinatesCollection = sessionRef.collection("coordinates");

    const sortOperator = (
      { date: date1, time: time1 }: ICoordinatesData,
      { date: date2, time: time2 }: ICoordinatesData
    ): number => {
      const datetime1 = `${date1}T${time1}`;
      const datetime2 = `${date2}T${time2}`;
      return datetime2.localeCompare(datetime1);
    };

    const lastRecordData =
      (await coordinatesCollection.get()).docs
        .map((doc) => doc.data() as ICoordinatesData)
        .filter(({ id }) => id === coordinatesData.id)
        .sort(sortOperator)
        .at(-1) ?? ({} as ICoordinatesData);

    const isNewRecordBeforeLastOne =
      lastRecordData?.date >= coordinatesData.date &&
      lastRecordData?.time >= coordinatesData.time;
    if (isNewRecordBeforeLastOne) {
      throw new CustomError({
        code: ErrorCode.DATE_AND_TIME_AFTER_PREVIOUS_ONE,
        message: `New coordinates date and time should be after ${lastRecordData.id}.`,
      });
    } else {
      const coordinatesRef = coordinatesCollection.doc(
        `${coordinatesData.date}T${coordinatesData.time}E${coordinatesData.id}`
      );

      const { statusCode } = await getEntity(sessionId, coordinatesData.id);
      if (statusCode === 404) {
        await createEntity(sessionId, {
          id: coordinatesData.id,
          label: coordinatesData.id,
        });
      }
      transaction.create(coordinatesRef, coordinatesData);
    }
  });
};

const addCoordinateToSession = async (
  sessionId: string,
  coordinatesData: ICoordinatesData
): Promise<{ statusCode: number; message: string }> => {
  try {
    await storeCoordinatesData(sessionId, coordinatesData);

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
    } else if (err.code === ErrorCode.DATE_AND_TIME_AFTER_PREVIOUS_ONE) {
      return { statusCode: 400, message: err.message };
    }
    const message = `Error while adding coordinate to session ${sessionId}.`;
    console.error(message, err);
    return { statusCode: 500, message };
  }
};

async function addManyCoordinatesToSession(
  sessionId: string,
  coordinates: ICoordinatesData[]
): Promise<{ statusCode: number; message: string }> {
  try {
    coordinates.forEach(async (coordinatesData) => {
      await storeCoordinatesData(sessionId, coordinatesData);
    });

    return {
      statusCode: 200,
      message: `${coordinates.length} coordinates succesfully added to session ${sessionId}`,
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
}
