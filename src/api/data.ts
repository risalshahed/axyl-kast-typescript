export interface Column {
  id: string;
  title: string;
};

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  status: 'new' | 'ongoing' | 'done';
};

export const columns: Column[] = [
  { id: 'new', title: 'New' },
  { id: 'ongoing', title: 'Ongoing' },
  { id: 'done', title: 'Done' },
];

export const data: TaskItem[] = [
  {
    id: crypto.randomUUID(),
    title: 'LC Wizard Shortcode',
    description: 'Create a shortcode in a WordPress Plugin with React JS',
    status: 'done'
  },
  {
    id: crypto.randomUUID(),
    title: 'Admin Panel',
    description: 'Create an admin panel with Filament, Herd & store it in DBngin',
    status: 'new'
  },
  {
    id: crypto.randomUUID(),
    title: 'Lyxa AI Task Submit',
    description: 'Create a Kanban board for handing Todo List with smooth user interface',
    status: 'ongoing'
  },
  {
    id: crypto.randomUUID(),
    title: 'Prepare Lecture',
    description: 'Organize the outlines for the Next JS Performance Optimization class of Ostad',
    status: 'new'
  },
];