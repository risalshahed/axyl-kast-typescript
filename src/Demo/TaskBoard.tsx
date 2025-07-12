// Component example (TaskBoard.tsx)
// import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../app/store';
import { updateTask, type DemoTaskItem } from './demoTaskSlice';
import { useDraggable, useDroppable, DndContext, type DragEndEvent } from '@dnd-kit/core';

const statuses = ['new', 'ongoing', 'done'] as const;

const TaskCard = ({ task }: DemoTaskItem) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        touchAction: 'none',
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="task-card">
      {task.title} <span className='bg-blue-500'>{task.status}</span>
    </div>
  );
};

const TaskColumn = ({ status }: { status: typeof statuses[number] }) => {
  const tasks = useSelector((state: RootState) =>
    state.tasks.filter(task => task.status === status)
  );

  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div ref={setNodeRef} className="task-column">
      <h3>{status.toUpperCase()}</h3>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

const TaskBoard = () => {
  const dispatch = useDispatch();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const id = active.id as string;
    const newStatus = over.id as typeof statuses[number];

    dispatch(updateTask({ id, status: newStatus }));
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', gap: '20px' }}>
        {statuses.map(status => (
          <TaskColumn key={status} status={status} />
        ))}
      </div>
    </DndContext>
  );
};

export default TaskBoard;
