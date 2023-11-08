import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { loginUser } from '../../redux/users/authSlice';

import '../../styles/Registration.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailInput, setEmail] = React.useState('');
  const [passwordInput, setPassword] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!emailInput || !passwordInput) {
      toast.error('All fields are required');
    } else if (!emailInput.includes('@') || !emailInput.includes('.com')) {
      toast.error('The email is invalid');
    } else if (passwordInput.length < 8) {
      toast.error('Password must be at least 8 characters long');
    } else if (emailInput && passwordInput) {
      try {
        const formData = {
          email: emailInput,
          password: passwordInput,
        };
        dispatch(
          loginUser(formData),
        );
        setEmail('');
        setPassword('');

        setTimeout(() => {
          navigate('/items');
        }, 6000);
      } catch (error) {
        toast.error('Error al registrar el usuario');
      }
    } else {
      toast.error('Error desconocido al registrar el usuario');
    }
  };

  return (
    <section className="loginContainer">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h1 className="formTitle">User login</h1>
        <div className="form-group">
          <label htmlFor="email">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              value={emailInput}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={passwordInput}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </section>
  );
};

export default Login;
