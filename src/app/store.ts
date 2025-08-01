import { configureStore } from "@reduxjs/toolkit";
import taskReducer from '../features/task/taskSlice';

export const store = configureStore({
  reducer: {
    task: taskReducer
  }
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;