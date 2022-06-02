import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../../config/store";
import { IEntity } from "../../models/IEntity";
export interface SessionState {
  id: string;
  entities: IEntity[];
}

const initialState: SessionState = {
  id: "",
  entities: [],
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    createSession: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    createEntity: (state, action: PayloadAction<IEntity>) => {
      const currentEntities = [...state.entities];
      currentEntities.push(action.payload);
      state.entities = currentEntities;
    },
    editEntity: (
      state,
      action: PayloadAction<Partial<IEntity> & { id: string }>
    ) => {
      const currentEntities = [...state.entities];
      const editedEntity = currentEntities.find(
        (entity) => entity.id === action.payload.id
      );

      if (editedEntity) {
        currentEntities[currentEntities.indexOf(editedEntity)] = {
          ...editedEntity,
          ...action.payload,
        };
        state.entities = currentEntities;
      }
    },
    updateEntities: (state, action: PayloadAction<IEntity[]>) => {
      state.entities = action.payload;
    },
    deleteEntity: (state, action: PayloadAction<string>) => {
      const currentEntities = [...state.entities];

      state.entities = currentEntities.filter(
        (entity) => entity.id !== action.payload
      );
    },
  },
});

export const {
  createSession,
  createEntity,
  editEntity,
  updateEntities,
  deleteEntity,
} = sessionSlice.actions;

export const selectSession = (state: AppState) => state.session;
export const selectEntities = (state: AppState) => state.session.entities;

export default sessionSlice.reducer;
