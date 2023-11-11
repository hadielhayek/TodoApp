import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import TodoPage from './pages/TodoPage';
import RegisterForm from './components/Auth/RegisterForm';
import LoginForm from './components/Auth/LoginForm';
import AddTodoPage from './pages/AddTodoPage'; 

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (

    <Router>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/todo" element={<TodoPage />} />
            <Route path="/add-todo" element={<AddTodoPage />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;