import { useDroppable } from "@dnd-kit/core";
import type { Column as ColumnType, TaskItem } from "../api/data"
import TaskCard from "./TaskCard";
import React from "react";

interface ColumnProps {
  column: ColumnType;
  tasks: TaskItem[];
  openContextId: string | null;
  setOpenContextId: React.Dispatch<React.SetStateAction<string | null>>;
}

let textColor: string;
let animationClass: string;

export default function Column({ column, tasks, openContextId, setOpenContextId }: ColumnProps) {

  const { setNodeRef } = useDroppable({
    id: column.id
  });

  let categoryBoxShadow: string;

  // style based on different status
  if(column.id === 'new') {
    categoryBoxShadow = '5px 8px 18px #3B82F6';
    textColor = 'blue-500';
    animationClass = "animate-from-top";
  } else if(column.id === 'ongoing') {
    categoryBoxShadow = '5px 8px 18px #F97316';
    textColor = 'orange-500';
    animationClass = "animate-from-right";
  } else if(column.id === 'done') {
    categoryBoxShadow = '5px 8px 18px #22C55E';
    textColor = 'green-500';
    animationClass = "animate-from-bottom";
  }

  return (
    <div className={`max-w-72 justify-self-center bg-[#eee] px-5 py-10 rounded-lg transform ${animationClass}`}>
      <div className={`flex items-center justify-between px-3 py-1 text-${textColor}`}>
        <h4 className='font-semibold'>
          {column.title}
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
          tasks.length === 0
          ?
          <p className={`text-sm px-2 py-1 rounded my-5 ${column.color}`}>
            No {column.title} task available
          </p>
          :
          tasks.map(task =>
            <TaskCard
              key={task.id}
              task={task}
              openContextId={openContextId}
              setOpenContextId={setOpenContextId}
              color={column.color}
              categoryBoxShadow={categoryBoxShadow}
            />
          )
        }
      </div>
    </div>
  )
}
