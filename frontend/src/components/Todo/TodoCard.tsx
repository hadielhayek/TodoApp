import React  from 'react';
import { FiEdit, FiDelete } from 'react-icons/fi';
import { Todo } from './Types';


interface TodoCardProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onUpdate: (id: number) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onDelete, onUpdate }) => {
  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleUpdate = () => {
    onUpdate(todo.id);
  };

  return (
    <div className="card">
      <p className="description">{todo.description}</p>
      <p className="priority">Priority: {todo.priority}</p>
      <p className="date">Date: {todo.date}</p>
      <p className={`status ${todo.completed ? 'completed' : ''}`}>
        Status: {todo.completed ? 'Completed' : 'Pending'}
      </p>
      <div className="actions">
        <button onClick={handleUpdate}>
          <FiEdit />
        </button>
        <button onClick={handleDelete}>
          <FiDelete />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
