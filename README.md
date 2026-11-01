# Task Management

A lightweight task manager built with React and Vite. Add tasks, mark them complete, edit their descriptions, and remove tasks. Your list is saved in this browser using `localStorage`.

## Features

- Add, edit, complete, and delete tasks.
- Restore saved tasks after reloading the page.
- Show an empty state and current task count.
- Keyboard-accessible checkbox and action controls with descriptive labels.
- Responsive layout with visible focus indicators.
- Clear feedback for task actions and browser storage errors.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite.

## Available scripts

- `npm run dev` - Start the Vite development server.
- `npm run build` - Create a production build in `dist/`.
- `npm run preview` - Preview the production build locally.
- `npm run lint` - Check JavaScript and JSX with ESLint.

## Project structure

- `index.html` - App entry document and metadata.
- `src/main.jsx` - React root and global stylesheet entry point.
- `src/App.jsx` - Task state, local storage, and application layout.
- `src/components/TaskForm.jsx` - Add/edit task form.
- `src/components/TaskList.jsx` - Task list and accessible task actions.
- `src/index.css` - Global styles, theme tokens, and focus defaults.
- `src/App.css` - Task manager layout and component styles.

Task data is stored locally in the current browser and is not synchronized between devices.
