import { addTask, deleteTask, editTask, getTasks } from "../features/task/taskApi";

export default function Tasks() {
  // লোড করা
  const allTasks = getTasks();
  console.log("All tasks:", allTasks);
  
  // নতুন যোগ করা
  const newTask = addTask({
    title: "Write documentation",
    description: "Document all API functions",
  });
  console.log("Added:", newTask);
  
  // এডিট করা
  const edited = editTask(newTask.id, { title: "Write detailed documentation" });
  console.log("Edited:", edited);
  
  // ডিলিট করা
  deleteTask(newTask.id);
  console.log("Deleted. Remaining tasks:", getTasks());

  return (
    <div>Tasks</div>
  )
}