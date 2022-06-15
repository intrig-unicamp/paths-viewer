import axios from "axios";
import { IEntity } from "../models/IEntity";

const SessionService = {
  create: async (): Promise<string> => {
    const response = await axios.post("/api/session");
    const { status, data } = response;

    if (status !== 200) {
      const message = "Error while creating session";
      console.error(message);
      throw new Error(message);
    } else {
      const { id } = data;
      return id;
    }
  },
  editEntity: async (
    sessionId: string,
    entity: IEntity
  ): Promise<{ statusCode: number; message: string }> => {
    const { id: entityId, coordinates, ...body } = entity;
    const response = await axios.put(
      `/api/session/${sessionId}/entity/${entityId}`,
      { id: entityId, ...body }
    );
    const { status, data } = response;

    if (status != 200) {
      const message = "Error while updating entity";
      console.error(message);
      throw new Error(message);
    } else {
      return data;
    }
  },
};

export default SessionService;
