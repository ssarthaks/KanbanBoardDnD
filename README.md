# Kanban Board Project
This repository contains a customizable Kanban board application built using React and TypeScript. The board supports drag-and-drop functionality, customizable columns, and local storage persistence. Designed with accessibility and responsiveness in mind, it provides a seamless user experience for task management.

## Features
1. Drag-and-Drop Functionality: Smooth task movement between columns using @hello-pangea/dnd.
2. Customizable Columns: Add or delete columns as needed (bonus feature).
4. Local Storage Persistence: Retain board state across sessions.
5. Smooth Animations: Enhance user experience with polished transitions.
6. TypeScript Support: Ensures type safety and better code quality.

## Installation Guide
1. git clone _______
2. npm install
3. npm run dev
The application will run in your browser at http://localhost:5173

## Main Dependencies
1. @hello-pangea/dnd --> Drag-and-drop library for React
2. lucide-react --> Collection of icons for UI Elements
3. react and react-dom --> Rendering the UI
4. zustand --> Library to manage state of task and columns
5. TailwindCSS --> Clean UI Styling

## Known Limitations and Trade-Offs
1. Limited Undo/Redo Support --> Does not support undo or redo mechanism
2. No Backend Integration --> Local storage is used to store the application data currently

## Future Improvements
1. Advanced Filtering and Sorting --> Filtering and Sorting Features can be added in future
2. Undo/Redo Functionality --> Implement undo and redo to allow users for better UX.
3. Integration with Third-Party Tools --> Allow users to import tasks from tools like Trello or Jira.
