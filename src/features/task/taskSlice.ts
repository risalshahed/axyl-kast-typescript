import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { addTask, getTasks } from "./taskApi"
import type { TaskItem } from "../../api/data";

export interface TaskState {
  tasks: TaskItem[];
  isLoading: boolean;
  isError: boolean;
  error: string | undefined;
}

export const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  isError: false,
  error: '',
}

// Async Thunks
export const fetchTasks = createAsyncThunk<TaskItem[]>(
  'task/fetchTasks', () => {
    const tasks = getTasks();
    return tasks;
  }
);

export const createTask = createAsyncThunk<TaskItem, Omit<TaskItem, 'id'>>(
  'task/createTask', (data) => {
    const task = addTask(data);
    return task;
  }
);

export const removeTask = createAsyncThunk<
  TaskItem[],
  string
>('task/removeTask', id => {
  const task = deleteTask(id);
  return task;
});

// create slice
const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    // activeUpdate: (state, action: PayloadAction<Record<string, unknown>>) => {
    //   state.taskUpdating = action.payload;
    // },
    // inactiveUpdate: state => {
    //   state.taskUpdating = {};
    // },
    updateTaskLocal: (state, action: PayloadAction<{ id: string; data: Partial<Omit<TaskItem, 'id'>> }>) => {
      const { id, data } = action.payload;
      const index = state.tasks.findIndex(t => t.id === id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...data };
      }
    },
  },
  extraReducers: builder => {
    builder
    .addCase(
      fetchTasks.pending,
      state => {
        state.isError = false;
        state.isLoading = true;
      }
    )
    .addCase(
      fetchTasks.fulfilled,
      (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.tasks = action.payload;
      }
    )
    .addCase(
      fetchTasks.rejected,
      (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.tasks = [];
      }
    )
    .addCase(
      createTask.pending,
      state => {
        state.isError = false;
        state.isLoading = true;
      }
    )
    .addCase(
      createTask.fulfilled,
      (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.tasks.unshift(action.payload);
      }
    )
    .addCase(
      createTask.rejected,
      (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      }
    )
  }
});

export default taskSlice.reducer;

export const { updateTaskLocal } = taskSlice.actions;