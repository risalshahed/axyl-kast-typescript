// import editImg from '../../assets/images/edit.svg'
// import deleteImg from '../../assets/images/delete.svg'

import { useDraggable } from "@dnd-kit/core";
import type { TaskItem } from "../api/data";
import { useDispatch } from "react-redux";
import React, { useEffect, useRef } from "react";
import { updateTaskLocal } from "../features/task/taskSlice";

interface TaskCardProps {
  task: TaskItem;
  openContextId: string | null;
  setOpenContextId: React.Dispatch<React.SetStateAction<string | null>>;
  color: string;
  categoryBoxShadow: string;
}

const statuses = ["new", "ongoing", "done"] as const;

export default function TaskCard({ task, openContextId, setOpenContextId, color, categoryBoxShadow }: TaskCardProps) {
  const { id, title, description, status } = task;

  const dispatch = useDispatch();

  const menuRef = useRef<HTMLDivElement | null>(null);

  // Right-click menu state
  // const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);

  const {
    attributes, listeners, setNodeRef, transform
  } = useDraggable({ id });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    touchAction: "none",
  } : undefined;

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenContextId(id);
  };

  // Use type-safe status
  const handleMove = (newStatus: typeof statuses[number]) => {
    console.log("Move clicked for", newStatus);
    dispatch(updateTaskLocal({ id, data: { status: newStatus } }));
    setOpenContextId(null);
  };

  const otherStatuses = statuses.filter(s => s !== status);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenContextId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openContextId, id, setOpenContextId]);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      className={`my-2 p-3 rounded-lg cursor-move relative`}
      style={{
        ...style,
        boxShadow: categoryBoxShadow
      }}
    >
      {/* Drag Handle and Context Menu Trigger */}
      <div
        className="p-3 cursor-move"
        {...listeners}
        onContextMenu={handleContextMenu}
      >
        <h3 className="font-semibold pb-2">{title}</h3>
        <div className="flex items-end justify-between">
          <p className="text-[12px] pr-5">{description}</p>
          <p className={`${color} p-1 rounded text-[12px] capitalize`}>
            {status}
          </p>
        </div>
      </div>
      
      {openContextId === id && (
        <div
          ref={menuRef}
          className="absolute z-50 bg-white border shadow rounded"
          style={{ top: 30, left: 0 }}
          onContextMenu={e => e.preventDefault()}
        >
          {otherStatuses.map(s => (
            <div
              key={s}
              onMouseDown={e =>  {
                e.stopPropagation();
                handleMove(s);
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              Move to {s}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}