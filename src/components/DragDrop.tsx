import { closestCorners, DndContext } from '@dnd-kit/core';
import Column from './Column';
import { useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

export default function DragDrop() {
  // Drag n Drop Rough
  const data = [
    {
      id: crypto.randomUUID(),
      title: 'LC Wizard Shortcode'
    },
    {
      id: crypto.randomUUID(),
      title: 'Admin Panel'
    },
    {
      id: crypto.randomUUID(),
      title: 'Lyxa AI Task Submit'
    },
    {
      id: crypto.randomUUID(),
      title: 'Prepare Lecture'
    },
  ];

  // Drag n Drop Rough
  const [tasks, setTasks] = useState([...data]);
  const getTaskPos = taskId => tasks.findIndex(t => t.id === taskId);

  const [newTitle, setNewTitle] = useState('');

  const handleDragEnd = e => {
    const { active, over } = e;
    if(active.id === over.id) return;

    setTasks(prevTasks => {
      const originalPos = getTaskPos(active.id);
      const newlPos = getTaskPos(over.id);

      return arrayMove(prevTasks, originalPos, newlPos);
    })
  }

  // add task
  const addTask = (title) => {
    setTasks(prevTasks => [
      {
        id: crypto.randomUUID(),
        title
      },
      ...prevTasks
    ])
  }

  const addNewTask = e => {
    e.preventDefault();
    addTask(newTitle);
    setNewTitle('');
  }

  return (
    <div className='px-5 py-12 my-12'>
      Drag Drop Rough


      {/* Drag n Drop Rough */}
      <form onSubmit={addNewTask} className='flex gap-3'>
        <input
          className='bg-[#dfdfdf] rounded-lg p-2'
          type="text"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
        />
        <button>Add</button>
      </form>
      {/* <Tasks /> */}
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <Column tasks={tasks} />
      </DndContext>
    </div>
  )
}
