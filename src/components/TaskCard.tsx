// import editImg from '../../assets/images/edit.svg'
// import deleteImg from '../../assets/images/delete.svg'

import { useDraggable } from "@dnd-kit/core";
import type { TaskItem } from "../api/data";

interface TaskCardProps {
  task: TaskItem
}

export default function TaskCard({ task }: TaskCardProps) {
  const { title, description, status } = task || {};

  const {
    attributes, listeners, setNodeRef, transform
  } = useDraggable({ id: task.id });

  const style = transform ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      touchAction: 'none',
    } : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className='column my-2 p-3 rounded-lg'
      style={style}
    >
      <h3 className='font-semibold pb-2'>
        {title}
      </h3>
      <div className="flex items-end justify-between">
        <p className='text-[12px] pr-5'>
          {description}
        </p>
        <p className='capitalize bg-blue-500 text-white p-1 rounded text-[12px]'>
          {status}
        </p>
      </div>
    </div>
  )
}
