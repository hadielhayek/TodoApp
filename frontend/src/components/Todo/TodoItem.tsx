import React from 'react';

interface TodoItemProps {
  todo: {
    id: number;
    description: string;
    priority: number;
    date: string;
    completed: boolean;
  };
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <div>
      <input type="checkbox" checked={todo.completed} />
      <span>{todo.description}</span>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};

export default TodoItem;
