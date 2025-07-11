import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTasks } from "../../features/task/taskSlice";
import EachTask from "./EachTask";

export default function Tasks() {
  const { tasks, isLoading, isError } = useAppSelector(state => state.task);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  let content;

  if(isLoading) content = <p>Loading...</p>
  
  if(!isLoading && isError) content = <p className='error'>An Error Occurred</p>

  if(!isLoading && !isError && tasks?.length === 0) content = <p>No tasks found</p>

  if(!isLoading && !isError && tasks?.length > 0) content = tasks.map(task =>
    <EachTask
      key={task.id}
      task={task}
    />
  )

  return (
    <>
      <p className="second_heading">Your {tasks?.length} tasks:</p>

      {/* Listing */}
      <div className="conatiner_of_list_of_tasks">
          <ul>
            {content}
          </ul>
      </div>
    </>
  );
}