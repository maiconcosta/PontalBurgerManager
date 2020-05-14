import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';

import './styles.scss';
import LoginImg from '../../assets/login.svg';

const toastError = () => {
  toast.error('Falha no login', {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const location = useLocation();
  const token = localStorage.getItem('token');

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.get('login', {
        auth: {
          username: email,
          password,
        },
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      history.push('/home');
    } catch (err) {
      toastError();
    }
  }

  useEffect(() => {
    if (location.state === 'logout') {
      localStorage.clear();
    } else if (token) {
      history.push('/home');
    }
  }, [location, history, token]);

  return (
    <div className="loginContainer">

      <div className="content">
        <img src={LoginImg} alt="" />

        <form onSubmit={handleLogin}>
          <TextField
            className="loginInput"
            label="Email"
            margin="dense"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            className="loginInput"
            label="Senha"
            margin="dense"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </form>
      </div>

    </div>
  );
}
