// import { configureStore } from '@reduxjs/toolkit';
// import taskReducer from '../Demo/demoTaskSlice';

// export const store = configureStore({
//   reducer: {
//     tasks: taskReducer,
//   },
// });

// // RootState type export koro
// export type RootState = ReturnType<typeof store.getState>;

// // Dispatch type export koro (optional)
// export type AppDispatch = typeof store.dispatch;


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