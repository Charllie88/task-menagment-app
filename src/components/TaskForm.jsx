import React, { useState } from 'react';

const TaskForm = ({ addTask, editTask, editingTask }) => {
  const [input, setInput] = useState(editingTask ? editingTask.text : '');

  React.useEffect(() => {
    setInput(editingTask ? editingTask.text : '');
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (editingTask) {
      editTask({ ...editingTask, text: input });
    } else {
      addTask({ text: input });
    }
    setInput('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">{editingTask ? 'Update' : 'Add'} Task</button>
    </form>
  );
};

export default TaskForm;
