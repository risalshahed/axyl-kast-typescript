import { data, type TaskItem } from "../../api/data";

const tasks: TaskItem[] = [...data];

export const getTasks = (): TaskItem[] => {
  return tasks;
}

export const addTask = (task: Omit<TaskItem, 'id'>): TaskItem => ({
  id: crypto.randomUUID(),
  ...task
});

export const deleteTask = (id: string): string => {
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    return id; // returned the deleted task id
  }
  throw new Error("Task not found");
};