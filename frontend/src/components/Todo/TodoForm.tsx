import React, { useState } from 'react';

const TodoForm: React.FC = () => {
  const [newTodo, setNewTodo] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewTodo('');
  };

  return (
    <div>
      <h2>Add New Todo</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input type="text" value={newTodo} onChange={handleInputChange} />
        </label>
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default TodoForm;
