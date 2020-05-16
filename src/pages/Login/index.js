import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { toastSuccess, toastError } from '../../components/toast';

import api from '../../services/api';

import './styles.scss';
import LoginImg from '../../assets/login.svg';

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

      toastSuccess('Login efetuado com sucesso!');

      history.push('/home');
    } catch (err) {
      toastError('Falha no login, tente novamente.');
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
