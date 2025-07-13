export interface Column {
  id: string;
  title: string;
  color: string;
};

export const columns: Column[] = [
  { id: 'new', title: 'New', color: 'bg-blue-500 text-white' },
  { id: 'ongoing', title: 'Ongoing', color: 'bg-orange-500 text-white' },
  { id: 'done', title: 'Done', color: 'bg-green-500 text-white' },
];

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  status: 'new' | 'ongoing' | 'done';
  movedToOngoingAt: string | null;
  dueAt: string | null;
};

export const data: TaskItem[] = [
  {
    id: crypto.randomUUID(),
    title: 'LC Wizard Shortcode',
    description: 'Create a shortcode in a WordPress Plugin with React JS',
    status: 'done',
    movedToOngoingAt: null,
    dueAt: null
  },
  {
    id: crypto.randomUUID(),
    title: 'Admin Panel',
    description: 'Create an admin panel with Filament, Herd & store it in DBngin',
    status: 'new',
    movedToOngoingAt: null,
    dueAt: null
  },
  {
    id: crypto.randomUUID(),
    title: 'Lyxa AI Task Submit',
    description: 'Create a Kanban board for handing Todo List with smooth user experience',
    status: 'ongoing',
    movedToOngoingAt: null,
    dueAt: new Date().setDate(new Date().getDate() + 2).toString()
  },
  {
    id: crypto.randomUUID(),
    title: 'Prepare Lecture',
    description: 'Organize the outlines for the Next JS Performance Optimization class of Ostad',
    status: 'new',
    movedToOngoingAt: null,
    dueAt: null
  },
];