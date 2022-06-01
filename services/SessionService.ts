import axios from "axios";

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
};

export default SessionService;
