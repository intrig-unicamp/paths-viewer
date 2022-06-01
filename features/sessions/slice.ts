import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../../config/store";
import { ICoordinatesData } from "../../models/ICoordinatesData";

export interface SessionState {
  id: string;
  entities: {
    id: string;
    color: string;
    coordinates: ICoordinatesData[];
  }[];
}

const initialState: SessionState = {
  id: "",
  entities: [],
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    create: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { create } = sessionSlice.actions;

export const selectSession = (state: AppState) => state.session;

export default sessionSlice.reducer;
