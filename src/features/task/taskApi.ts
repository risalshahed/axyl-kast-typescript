import { data, type TaskItem } from "../../api/data";

const tasks: TaskItem[] = [...data];

export const getTasks = (): TaskItem[] => {
  return tasks;
}

export const addTask = (task: Omit<TaskItem, 'id'>): TaskItem => ({
  id: crypto.randomUUID(),
  ...task
});