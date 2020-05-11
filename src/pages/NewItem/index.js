import React, { useEffect, useState } from 'react';

import { Button, MenuItem, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.scss';

import api from '../../services/api';

const handleSuccess = () => {
  toast.success('Item cadastrado com sucesso!', {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

const handleError = () => {
  toast.error('Erro ao cadastrar o item, tente novamente.', {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export default function NewItem() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categorieId, setCategorieId] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get('categories', {
    }).then((response) => {
      setCategories(response.data);
    });
  }, []);

  async function handleNewItem(e) {
    e.preventDefault();

    const data = {
      name,
      description,
      categorieId,
      value,
    };

    try {
      await api.post('item', data, {});
      handleSuccess();
      history.push('/cardapio');
    } catch (err) {
      handleError();
    }
  }

  return (
    <div className="newItemContainer">
      <header>
        <h2>Novo Item</h2>
      </header>

      <div className="contentForm">
        <form onSubmit={handleNewItem}>
          <TextField
            id="standard-basic"
            label="Nome"
            margin="dense"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <TextField
            id="standard-basic"
            label="Descrição"
            multiline
            margin="dense"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <TextField
            id="standard-select"
            label="Escolha uma categoria"
            margin="dense"
            select
            value={categorieId}
            onChange={(e) => setCategorieId(e.target.value)}
            required
          >
            {categories.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            type="number"
            className="value"
            id="standard-basic"
            label="Valor"
            margin="dense"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <Button type="submit" variant="contained" color="primary">Cadastrar</Button>
        </form>
      </div>
    </div>
  );
}
