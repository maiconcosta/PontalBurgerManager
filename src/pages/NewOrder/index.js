import React, { useEffect, useState } from 'react';

import {
    Button,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

import api from '../../services/api';

export default function NewItem() {
    const [locale, setLocale] = useState('');
    const [total, setTotal] = useState(0);
    const statusId = 1;

    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const history = useHistory();

    useEffect(() => {
        requestApiData();
    }, []);

    async function requestApiData() {
        api.get('items', {
        }).then(response => {
            setItems(response.data);
        })
    }

    async function handleNewOrder(e) {
        e.preventDefault();

        const data = {
            locale,
            total,
            statusId,
            items: selectedItems
        };

        try {
            await api.post('order', data, {});
            handleSuccess();
            history.push('/pedidos');
        } catch (err) {
            handleError();
        }
    }

    function handleSuccess() {
        toast.success('Pedido cadastrado com sucesso!', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }

    function handleError() {
        toast.error('Erro ao cadastrar o pedido, tente novamente.', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }    

    return (
        <div className="newOrderContainer">
            <header>
                <h2>Novo Pedido</h2>
            </header>

            <div className="contentForm">
                <form onSubmit={handleNewOrder}>
                    <TextField
                        id="standard-basic"
                        label="Local"
                        margin="dense"
                        value={locale}
                        onChange={e => setLocale(e.target.value)}
                        required
                    />

                    <FormControl margin="dense">
                        <InputLabel>Selecione os itens</InputLabel>
                        <Select
                            id="mutiple-name"
                            label="Itens"
                            multiple
                            value={selectedItems}
                            onChange={e => setSelectedItems(e.target.value)}
                            input={<Input />}
                        >
                            {items.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        type="number"
                        className="value"
                        id="standard-basic"
                        label="Total"
                        margin="dense"
                        value={total}
                        onChange={e => setTotal(e.target.value)}
                    />

                    <Button type="submit" variant="contained" color="primary">Cadastrar</Button>
                    <ToastContainer />
                </form>
            </div>
        </div>
    )
}