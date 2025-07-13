# React Kanban Task Management Application

A modern, interactive Kanban-style Todo List Application built with React.js, Redux Toolkit, TypeScript, and Tailwind CSS.
This project demonstrates task management across different stages, context menus, drag-and-drop functionality, and responsive design with smooth animations.

## Project Overview

### This application enables users to:

- Create, view, and manage todos in a Kanban board with three columns:

  - New (blue): For newly created tasks
  - Ongoing (orange): For tasks currently in progress
  - Done (green): For completed tasks

- Move tasks between columns using:

  - Right-click context menu
  - Drag and Drop (powered by Dnd Kit)

- Set due dates on ongoing tasks and receive alerts when tasks are overdue

- Enjoy a responsive, clean, and modern UI enhanced by Tailwind CSS and custom animations

## Features

### Three Columns for Task Management

- New: Create tasks here (title, description)
- Ongoing: Track active work
- Done: Archive completed tasks
- Each status is visually distinct with color labels

### Todo Item Creation

- Form to create new tasks
- Tasks automatically added to the top of the New column

### Moving Tasks

- Right-click Context Menu:

  - Shows only valid move options (excluding current status)

  - Example

    - From New: Move to Ongoing or Done
    - From Ongoing: Move to New or Done
    - From Done: Move to New or Ongoing

- Drag and Drop:
  - Smoothly drag tasks between columns
  - Status updates automatically

### Due Date & Overdue Alerts

- In Ongoing column, set a due date/time
- Application checks if tasks are overdue and shows an alert if so

### Responsive Design & Animations

- Tailwind CSS used for layout and styling
- Subtle animations when:
  - Tasks are added
  - Tasks move between columns
  - Alerts appear

### TypeScript Strictness

- Type safety throughout the codebase

### Redux Toolkit Integration

- Global state management of all tasks
- Clean slices and actions

### ⚙️ Tech Stack

- #### React.js – UI framework
- #### Redux Toolkit – State management
- #### TypeScript – Type safety and better developer experience
- #### Tailwind CSS – Utility-first styling
- #### Dnd Kit – Drag-and-drop functionality
- #### Date handling – To manage due dates and overdue checks

### Run the Project locally as follows

```
https://github.com/risalshahed/axyl-kast-typescript.git
```

### Install dependencies

```
npm i
```

### Run the Application

```
npm run dev
```
