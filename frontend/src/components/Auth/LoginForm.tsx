import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import todo from '../../assets/todo.png';
import '../../styles/LoginForm.css';
import axios from 'axios';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateFormData = () => {
    return true; 
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateFormData()) {
    setError('Please fill out the form correctly.');
    return;
  }

  try {
    setLoading(true);

    const response = await axios.post('http://localhost:3000/auth/login', formData);

    if (response.status === 201) {
      localStorage.setItem('token', response.data.token);
      navigate('/todo');
    } else {
      setError(response.data.error || 'Login failed. Please check your credentials.');
    }
  } catch (error) {
    setError('An unexpected error occurred. Please try again.');
    console.error('Error during login:', error);
  } finally {
    setLoading(false);
  }
};



  return (
    <form onSubmit={handleSubmit} >
      <div className="login-form-container">
      <div className="left-section">
        <img src={todo} alt="Your Image" />
      </div>
      <div className="right-section">
        <p className="title">Welcome back to TODEDA, please log in!</p>
        {error && <div className="error-message">{error}</div>}
        <label>
          <FiMail />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          <FiLock />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
      </div>
    </form>
  );
};

export default LoginForm;
