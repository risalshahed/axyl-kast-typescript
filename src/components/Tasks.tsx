import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchTasks, updateTaskLocal } from "../features/task/taskSlice";
import TaskCard from "./TaskCard";
import { columns, type TaskItem } from "../api/data";
import Column from "./Column";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import { store } from "../app/store";

export default function Tasks() {
  const { tasks, isLoading, isError } = useAppSelector(state => state.task);

  // console.log('tasks', tasks);
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
  
    const id = active.id as string;
    const newStatus = over.id as "new" | "ongoing" | "done";
  
    dispatch(updateTaskLocal({ id, data: { status: newStatus } }));
  
    // temporary debug: force UI update by triggering a dummy state change or log full state
    setTimeout(() => {
      console.log("Current tasks:", store.getState().task);
    }, 100);
  };
  

  // const handleDragEnd = (event: DragEndEvent) => {
  //   const { active, over } = event;

  //   console.log("DragEnd fired", { active, over });

  //   if(!over) return;

  //   const id = active.id as string;
  //   console.log('taskId', id);
  //   const newStatus = over.id as "new" | "ongoing" | "done";

  //   console.log("Dispatching status update", { id, newStatus });

  //   dispatch(updateTask({ id, data: { status: newStatus } }));
  // }

  // let content;

  // if(isLoading) content = <p>Loading...</p>
  
  // if(!isLoading && isError) content = <p className='error'>An Error Occurred</p>

  // if(!isLoading && !isError && tasks?.length === 0) content = <p>No tasks found</p>

  // if(!isLoading && !isError && tasks?.length > 0) content = tasks.map(task =>
  //   <TaskCard
  //     key={task.id}
  //     task={task}
  //   />
  // );

  return (
    <div className='mx-auto flex gap-5 py-20'>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        {
          columns.map(column =>
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter(t => t.status === column.id)}
            />
          )
        }
      </DndContext>

      {/* <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div style={{ display: "flex", gap: "20px" }}>
          <TaskCard id="new" title="New" tasks={newTasks} />
          <TaskCard id="ongoing" title="Ongoing" tasks={ongoingTasks} />
          <TaskCard id="done" title="Done" tasks={completedTasks} />
        </div>
      </DndContext> */}
      

      {/* Main Tasks */}
      {/* Listing */}
      {/* <div>
        <div>
          {content}
        </div>
      </div> */}
    </div>
  );
}