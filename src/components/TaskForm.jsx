import { useEffect, useRef, useState } from 'react';

function TaskForm({ addTask, editTask, editingTask, cancelEdit }) {
  const [input, setInput] = useState(editingTask?.text ?? '');
  const [formError, setFormError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (editingTask) inputRef.current?.focus();
  }, [editingTask]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = input.trim();
    if (!text) {
      setFormError('Enter a task description before saving.');
      inputRef.current?.focus();
      return;
    }

    if (editingTask) {
      editTask({ ...editingTask, text });
    } else {
      addTask(text);
    }
    setInput('');
    setFormError('');
  };

  const handleCancel = () => {
    setInput('');
    cancelEdit();
  };

  return (
    <form
      className={`task-form${editingTask ? ' is-editing' : ''}`}
      onSubmit={handleSubmit}
    >
      <label className="sr-only" htmlFor="task-input">
        Task description
      </label>
      <input
        ref={inputRef}
        id="task-input"
        name="task"
        type="text"
        placeholder="What needs to get done?"
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
          setFormError('');
        }}
        maxLength={120}
        required
        aria-invalid={Boolean(formError)}
        aria-describedby={formError ? 'task-form-error' : undefined}
      />
      <button className="submit-button" type="submit">
        {editingTask ? 'Save task' : 'Add task'}
      </button>
      {editingTask && (
        <button
          className="cancel-button"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
      {formError && (
        <p className="form-error" id="task-form-error">
          {formError}
        </p>
      )}
    </form>
  );
}

export default TaskForm;
