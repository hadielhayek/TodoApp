import React, { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import TodoCard from '../components/Todo/TodoCard';
import axios from 'axios';
import '../styles/TodoPage.css';

interface Todo {
  id: number;
  description: string;
  priority: string;
  date: string;
  completed: boolean;
}

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/todo/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleUpdate = async (id: number) => {
    console.log('Update todo with id:', id);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Todo Page</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search todos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Link to="/add-todo" className="add-button">
        <FiPlusCircle />
      </Link>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <TodoCard todo={todo} onDelete={handleDelete} onUpdate={handleUpdate} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;
