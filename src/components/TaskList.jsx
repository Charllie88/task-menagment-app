function TaskList({ tasks, deleteTask, toggleComplete, startEditTask }) {
  if (tasks.length === 0) {
    return <p className="empty">No tasks yet. Add one to get started.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={task.completed ? 'completed' : ''}>
          <label className="task-label">
            <input
              className="task-checkbox"
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <span className="task-text">{task.text}</span>
          </label>
          <div className="actions">
            <button
              className="edit-button"
              type="button"
              onClick={() => startEditTask(task)}
              aria-label={`Edit ${task.text}`}
            >
              Edit
            </button>
            <button
              className="delete-button"
              type="button"
              onClick={() => deleteTask(task.id)}
              aria-label={`Delete ${task.text}`}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
