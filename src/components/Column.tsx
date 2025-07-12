import { useDroppable } from "@dnd-kit/core";
import type { Column as ColumnType, TaskItem } from "../api/data"
import TaskCard from "./TaskCard";

interface ColumnProps {
  column: ColumnType;
  tasks: TaskItem[];
}

export default function Column({ column, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id
  });

  return (
    <div className='max-w-72 bg-[#eee] px-5 py-10 rounded-lg'>
      <div className='flex items-center justify-between px-3 py-1'>
        <h4 className='font-semibold'>
          {column?.title}
        </h4>
        <p>
          ...
        </p>
      </div>
      <div
        ref={setNodeRef}
        className='flex flex-col gap-4'
      >
        {
          tasks?.map(task =>
            <TaskCard
              key={task.id}
              task={task}
            />
          )
        }
      </div>
    </div>
  )
}
