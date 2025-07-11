import { data, type TaskItem } from "../../api/data";

const tasks: TaskItem[] = [...data];

export const getTasks = (): TaskItem[] => {
  return tasks;
}

export const addTask = (task: Omit<TaskItem, 'id'>): TaskItem => {
  const newTask: TaskItem = {
    id: crypto.randomUUID(),
    ...task
  };
  tasks.push(newTask);
  return newTask;
}

export const editTask = (id: string, data: Partial<Omit<TaskItem, 'id'>>): TaskItem  =>{
  const index = tasks.findIndex(t => t.id === id);
  if(index === -1) {
    throw new Error(`Task with id ${id} not found`);
  }
  const updatedTask = {
    ...tasks[index],
    ...data
  }
  tasks[index] = updatedTask;
  return updatedTask;
}

export const deleteTask = (id: string): TaskItem[] => {
  const newTask = tasks.filter(t => t.id !== id);
  return newTask;
}