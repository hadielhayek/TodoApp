import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import todo from '../../assets/todo.png';
import '../../styles/RegisterForm.css';
import axios from 'axios';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
    name: '',
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
  
      const response = await axios.post('http://localhost:3000/auth/register', formData);
  
      if (response.status === 200) {
        setTimeout(() => {
          navigate('/login');
        }, 500);
      } else {
        setError(response.data.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Error during registration:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <div className="left-section">
          <img src={todo} alt="Your Image" />
        </div>
        <div className="right-section">
          <p className="title">Welcome to TODEDA, please fill the forms below!</p>
          {error && <div className="error-message">{error}</div>}
          <label>
            <FiUser />
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            <FiMail />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          </label>
          <label>
            <FiLock />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
          <p className="link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
