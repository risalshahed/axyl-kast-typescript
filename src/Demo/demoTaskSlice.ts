// Redux slice example (demoTaskSlice.ts)
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface DemoTaskItem {
  id: string;
  title: string;
  status: 'new' | 'ongoing' | 'done';
}

const initialState: DemoTaskItem[] = [
  { id: '1', title: 'Task 1', status: 'new' },
  { id: '2', title: 'Task 2', status: 'ongoing' },
  { id: '3', title: 'Task 3', status: 'done' },
];

const demoTaskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateTask: (state, action: PayloadAction<{ id: string; status: DemoTaskItem['status'] }>) => {
      const { id, status } = action.payload;
      const task = state.find(t => t.id === id);
      if (task) {
        task.status = status;
      }
    },
  },
});

export const { updateTask } = demoTaskSlice.actions;
export default demoTaskSlice.reducer;