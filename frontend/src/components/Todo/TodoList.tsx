import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/todo');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id}>{todo.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
