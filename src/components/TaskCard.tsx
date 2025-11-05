import { useDraggable } from "@dnd-kit/core";
import type { TaskItem } from "../api/data";
import React, { useEffect, useRef, useState } from "react";
import { removeTask, updateTaskLocal } from "../features/task/taskSlice";
import { useAppDispatch } from "../app/hooks";

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

  const dispatch = useAppDispatch();

  const menuRef = useRef<HTMLDivElement | null>(null);

  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);

  const [selectedDate, setSelectedDate] = useState<string>("");

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
    setMenuPosition({ x: e.clientX, y: e.clientY });
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

  // menu viewscreen side effect
  useEffect(() => {
    if (!menuPosition) return;

    const menuWidth = 150; // approximate width of the menu in pixels
    const menuHeight = otherStatuses.length * 36; // approximate height based on items

    let { x, y } = menuPosition;

    // Horizontal overflow
    if (x + menuWidth > window.innerWidth) {
      x = window.innerWidth - menuWidth - 10;
    }
    // Vertical overflow
    if (y + menuHeight > window.innerHeight) {
      y = window.innerHeight - menuHeight - 10;
    }

    setMenuPosition({ x, y });
  }, [menuPosition, otherStatuses.length]);

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>, taskId: string) => {
    console.log('task id', taskId);
    dispatch(removeTask(taskId));
    e.stopPropagation();
  }

  const renderDeadlineMessage = () => {
    if (!selectedDate) return null;
  
    const today = new Date();
    today.setHours(0,0,0,0);
  
    const selected = new Date(selectedDate);
    selected.setHours(0,0,0,0);
  
    const diffTime = selected.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
    if (diffDays < 0) {
      return (
        <p className="text-xs text-red-600 font-semibold mt-1">
          Deadline is finished {diffDays * -1} days ago!
        </p>
      );
    } else if (diffDays === 0) {
      return (
        <p className="text-xs text-orange-500 font-semibold mt-2">
          Today is the deadline.
        </p>
      );
    } else {
      return (
        <p className="text-xs text-green-600 font-semibold mt-1">
          {diffDays} day{diffDays > 1 ? "s" : ""} remaining
        </p>
      );
    }
  }

  return (
    <>
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
          <div className="flex justify-between items-center">
            <h3 className="font-semibold pb-2">{title}</h3>
            {/* <button
              onClick={e => handleRemove(e, id)}
              className="bg-red-600 text-white px-2 rounded-md cursor-pointer"
            >
              ✕
            </button> */}
          </div>
          <div className="flex items-end justify-between">
            <p className="text-[12px] pr-5">{description}</p>
            <p className={`${color} p-1 rounded text-[12px] capitalize`}>
              {status}
            </p>
          </div>
          {status === 'ongoing' && (
            <div className="mt-4">
              <input
                type="date"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors shadow-sm"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              {renderDeadlineMessage()}
            </div>
          )}
        </div>
        
        {openContextId === id && menuPosition && (
          <div
            ref={menuRef}
            className="absolute z-50 bg-white border shadow rounded"
            style={{
              top: menuPosition.y,
              left: menuPosition.x,
              position: "fixed"
            }}
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
    </>
  )
}