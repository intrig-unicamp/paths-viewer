import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import filesReducer from "../features/files/slice";
import sessionReducer from "../features/sessions/slice";

export function makeStore() {
  return configureStore({
    reducer: { files: filesReducer, session: sessionReducer },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
