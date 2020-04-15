import React, { useState } from 'react';
import { Button, MenuItem, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

import api from '../../services/api';

const categories = [
    {
        id: 1,
        name: 'Burgers',
    },
    {
        id: 2,
        name: 'Açaí',
    },
    {
        id: 3,
        name: 'Fritas',
    }
];

export default function NewItem() {
    const [name, setName] = useState('');
    const [categorieId, setCategorieId] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    async function handleNewItem(e) {
        e.preventDefault();

        const data = {
            name,
            categorieId,
            value
        };       

        try {
            await api.post('item', data, {});
            handleSuccess();
            history.push('/cardapio');
        } catch (err) {
            handleError();
        }
    }

    function handleSuccess() {
        toast.success('Item cadastrado com sucesso!', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }

    function handleError() {
        toast.error('Erro ao cadastrar o item, tente novamente.', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
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
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />

                    <TextField
                        id="standard-select"
                        label="Escolha uma categoria"
                        select
                        value={categorieId}
                        onChange={e => setCategorieId(e.target.value)}
                        required>
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
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <Button type="submit" variant="contained" color="primary">Cadastrar</Button>
                    <ToastContainer />
                </form>
            </div>
        </div>
    )
}