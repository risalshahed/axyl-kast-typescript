import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchTasks, updateTaskLocal } from "../features/task/taskSlice";
import { columns } from "../api/data";
import Column from "./Column";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";

export default function Tasks() {
  const { tasks, isLoading, isError } = useAppSelector(state => state.task);
  
  const dispatch = useAppDispatch();

  const [openContextId, setOpenContextId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
  
    const id = active.id as string;
    const newStatus = over.id as "new" | "ongoing" | "done";
  
    dispatch(updateTaskLocal({ id, data: { status: newStatus } }));
  };

  // let content;

  if(isLoading) return <p>Loading...</p>;
  
  if(!isLoading && isError) return <p>An Error Occurred</p>;

  if(!isLoading && !isError && tasks?.length === 0) return <p>No tasks found</p>;

  return (
    <div className='mx-auto flex gap-5 py-20'>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        {
          columns.map(column =>
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter(t => t.status === column.id)}
              openContextId={openContextId}
              setOpenContextId={setOpenContextId}
            />
          )
        }
      </DndContext>
    </div>
  );
}