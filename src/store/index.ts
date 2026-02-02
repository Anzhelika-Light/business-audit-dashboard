import { configureStore } from "@reduxjs/toolkit";
import auditReducer from "./auditSlice";

export const store = configureStore({
  reducer: {
    audits: auditReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
