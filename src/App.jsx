import { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

function loadTasks() {
  try {
    const saved = localStorage.getItem('tasks');
    if (!saved) return { tasks: [], error: '' };

    const tasks = JSON.parse(saved);
    if (
      !Array.isArray(tasks) ||
      !tasks.every(
        (task) =>
          task &&
          (typeof task.id === 'string' || typeof task.id === 'number') &&
          typeof task.text === 'string' &&
          typeof task.completed === 'boolean'
      )
    ) {
      return {
        tasks: [],
        error: 'Saved tasks could not be read. Add a task to start a new list.',
      };
    }

    return { tasks, error: '' };
  } catch (error) {
    console.error('Unable to load saved tasks:', error);
    return {
      tasks: [],
      error: 'Saved tasks could not be read. Add a task to start a new list.',
    };
  }
}

function createTaskId() {
  return globalThis.crypto?.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function App() {
  const [savedState] = useState(loadTasks);
  const [tasks, setTasks] = useState(savedState.tasks);
  const [editingTask, setEditingTask] = useState(null);
  const [storageError, setStorageError] = useState(savedState.error);
  const [announcement, setAnnouncement] = useState('');

  const saveTasks = (nextTasks) => {
    setTasks(nextTasks);
    try {
      localStorage.setItem('tasks', JSON.stringify(nextTasks));
      setStorageError('');
    } catch (error) {
      console.error('Unable to save tasks:', error);
      setStorageError('Your changes could not be saved in this browser.');
    }
  };

  const addTask = (text) => {
    saveTasks([...tasks, { id: createTaskId(), text, completed: false }]);
    setAnnouncement(`Added task: ${text}`);
  };

  const deleteTask = (id) => {
    const task = tasks.find((item) => item.id === id);
    saveTasks(tasks.filter((item) => item.id !== id));
    if (editingTask?.id === id) setEditingTask(null);
    if (task) setAnnouncement(`Deleted task: ${task.text}`);
  };

  const toggleComplete = (id) => {
    const task = tasks.find((item) => item.id === id);
    saveTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    if (task) {
      setAnnouncement(
        `${task.text} marked ${task.completed ? 'active' : 'complete'}.`
      );
    }
  };

  const startEditTask = (task) => {
    setEditingTask(task);
    setAnnouncement(`Editing task: ${task.text}`);
  };

  const editTask = (updatedTask) => {
    saveTasks(
      tasks.map((task) =>
        task.id === updatedTask.id ? { ...task, text: updatedTask.text } : task
      )
    );
    setEditingTask(null);
    setAnnouncement(`Updated task: ${updatedTask.text}`);
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setAnnouncement('Edit canceled.');
  };

  return (
    <main className="app-container">
      <header className="app-header">
        <p className="eyebrow">Make space for what matters</p>
        <h1>Task Management</h1>
        <p className="subtitle">A simple place to keep your next steps in view.</p>
      </header>

      {storageError && (
        <p className="storage-message" role="alert">
          {storageError}
        </p>
      )}
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>

      <TaskForm
        key={editingTask ? `edit-${editingTask.id}` : 'new-task'}
        addTask={addTask}
        editTask={editTask}
        editingTask={editingTask}
        cancelEdit={cancelEdit}
      />
      <section className="tasks-section" aria-labelledby="tasks-heading">
        <div className="tasks-heading-row">
          <h2 id="tasks-heading">Your tasks</h2>
          <span className="task-count">
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
          </span>
        </div>
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
          startEditTask={startEditTask}
        />
      </section>
    </main>
  );
}

export default App;
