import React from 'react';

const TaskList = ({ tasks, deleteTask, toggleComplete, startEditTask }) => {
  if (tasks.length === 0) {
    return <p className="empty">No tasks yet. Add one!</p>;
  }
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={task.completed ? 'completed' : ''}>
          <span onClick={() => toggleComplete(task.id)}>{task.text}</span>
          <div className="actions">
            <button onClick={() => startEditTask(task)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
