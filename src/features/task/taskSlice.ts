import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { addTask, deleteTask, editTask, getTasks } from "./taskApi"
import type { TaskItem } from "../../api/data";

export interface TaskState {
  tasks: TaskItem[];
  isLoading: boolean;
  isError: boolean;
  error: string | undefined;
  taskUpdating: Record<string, unknown>;
}

export const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  isError: false,
  error: '',
  taskUpdating: {}
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

export const updateTask = createAsyncThunk<
  TaskItem,
  { id: string; data: Partial<Omit<TaskItem, 'id'>> }
>(
  'task/updateTask', ({ id, data }) => {
    const task = editTask(id, data);
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
    activeUpdate: (state, action: PayloadAction<Record<string, unknown>>) => {
      state.taskUpdating = action.payload;
    },
    inactiveUpdate: state => {
      state.taskUpdating = {};
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
        state.tasks.push(action.payload);
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
    .addCase(
      updateTask.pending,
      state => {
        state.isError = false;
        state.isLoading = true;
      }
    )
    .addCase(
      updateTask.fulfilled,
      (state, action: PayloadAction<TaskItem>) => {
        state.isError = false;
        state.isLoading = false;
        const indexToUpdate = state.tasks.findIndex(
          t => t.id === action.payload.id
        );
        if(indexToUpdate !== -1) {
          state.tasks[indexToUpdate] = action.payload;
        }
      }
    )
    .addCase(
      updateTask.rejected,
      (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      }
    )
    .addCase(
      removeTask.pending,
      state => {
        state.isError = false;
        state.isLoading = true;
      }
    )
    .addCase(
      removeTask.fulfilled,
      (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.tasks = state.tasks.filter(t => t.id !== action.meta.arg)
      }
    )
    .addCase(
      removeTask.rejected,
      (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      }
    )
  }
});

export default taskSlice.reducer;

export const { activeUpdate, inactiveUpdate } = taskSlice.actions;