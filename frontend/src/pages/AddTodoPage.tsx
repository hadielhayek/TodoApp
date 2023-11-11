import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import '../styles/AddTodoPage.css'
const AddTodoPage: React.FC = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<string>('Low');
  const [date, setDate] = useState<string>('');

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description, priority, date, completed: false }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Todo added successfully:', data);
        navigate('/todo');
      } else {
        console.error('Failed to add todo:', data.error || 'An unexpected error occurred.');
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div className="container">
      <h1>Add Todo</h1>
      <form onSubmit={handleSubmit}>
  <div className="label-input">
    <label>Description:</label>
    <input type="text" value={description} onChange={handleDescriptionChange} required />
  </div>
  <div className="label-input">
    <label>Priority:</label>
    <select value={priority} onChange={handlePriorityChange}>
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>
  </div>
  <div className="label-input">
    <label>Date:</label>
    <input type="date" value={date} onChange={handleDateChange} required />
  </div>
  <div className="buttons">
  <Link to="/todo">
      <button type="button">Cancel</button>
    </Link>
    <button type="submit">Add Todo</button>
    
  </div>
</form>

    </div>
  );
};

export default AddTodoPage;
