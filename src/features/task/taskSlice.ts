import { createAsyncThunk } from "@reduxjs/toolkit"
import { addTask, deleteTask, editTask, getTasks } from "./taskApi"
import type { TaskItem } from "../../api/data";

export interface TaskState {
  tasks: TaskItem[];
  isLoading: boolean;
  isError: boolean;
  error: string;
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
})