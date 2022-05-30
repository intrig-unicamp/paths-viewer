import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../../config/store";
import { IFile } from "../../pages/_app";

export interface FilesState {
  files: IFile[];
}

const initialState: FilesState = {
  files: [],
};

export const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<IFile>) => {
      const currentFiles = [...state.files];
      currentFiles.push(action.payload);
      state.files = currentFiles;
    },
    remove: (state, action: PayloadAction<number>) => {
      const currentFiles = [...state.files];
      currentFiles.splice(action.payload);
      state.files = currentFiles;
    },
    changeColor: (
      state,
      action: PayloadAction<{ index: number; color: string }>
    ) => {
      const currentFiles = [...state.files];
      const { index, color } = action.payload;
      currentFiles[index].color = color;
      state.files = currentFiles;
    },
  },
});

export const { add, remove, changeColor } = filesSlice.actions;

export const selectFiles = (state: AppState) => state.files.files;

export default filesSlice.reducer;
