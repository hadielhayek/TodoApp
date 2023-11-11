import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import TodoPage from './pages/TodoPage';
import RegisterForm from './components/Auth/RegisterForm';
import LoginForm from './components/Auth/LoginForm';
import AddTodoPage from './pages/AddTodoPage'; 
import { AuthContext, AuthContextValue, AuthProvider } from './components/Auth/AuthContext';

// const AuthenticatedRoute: React.FC<{ }> = ({ }) => {
//   const { isAuthenticated } = useAuth();

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };

const App: React.FC = () => {
  const { isAuthenticated } = useContext<AuthContextValue>(AuthContext);

  return (
    <Router>
      <Routes>
        {isAuthenticated ?
        <>
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/add-todo" element={<AddTodoPage />} />
      </>
      :
    <Route path="/login" element={<LoginForm />} />
}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;