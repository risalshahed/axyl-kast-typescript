import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { createTask } from "../features/task/taskSlice";

export default function Form({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const dispatch = useAppDispatch();

  const resetForm = () => {
    setTitle('');
    setDescription('');
  }

  // Close on ESC press
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', { title, description });
    try {
      await dispatch(createTask({
        title,
        description,
        status: 'new',
        movedToOngoingAt: null,
        dueAt: null
      })).unwrap();
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-gray-500 opacity-90 z-10 flex items-center justify-center"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6"
      >
        <h3 className="text-xl font-semibold mb-4 text-center">
          Add New Task
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              required
              placeholder="Enter title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              id="description"
              type="text"
              name="description"
              required
              placeholder="Enter description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition cursor-pointer"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}