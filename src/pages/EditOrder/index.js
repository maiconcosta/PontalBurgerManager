import React, { useEffect, useState } from 'react';

import {
    Button,
    InputAdornment,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    TextField
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

import api from '../../services/api';

export default function EditOrder() {
    const history = useHistory();
    const location = useLocation();

    const { order } = location.state;

    const [locale, setLocale] = useState('');
    const [internalCode, setInternalCode] = useState('');
    const [observation, setObservation] = useState('');
    const [total, setTotal] = useState(0);
    const [statusId, setStatusId] = useState('');
    const [status, setStatus] = useState([]);
    const [paymentId, setPaymentId] = useState('');
    const [payments, setPayments] = useState([]);

    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const {
            items,
            internalCode,
            locale,
            observation,
            paymentId,
            statusId,
            total
        } = order;

        setLocale(locale);
        setInternalCode(internalCode);
        setObservation(observation);
        setPaymentId(paymentId);
        setStatusId(statusId);
        setTotal(total);
        setSelectedItems(items);

        requestApiData();
    }, [order]);

    async function requestApiData() {
        api.get('payments', {
        }).then(response => {
            setPayments(response.data);
        }).catch((err) => {
            console.log(err);
        });

        api.get('status', {
        }).then(response => {
            setStatus(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    async function handleEditOrder(e) {
        e.preventDefault();

        const data = {
            locale,
            observation,
            total,
            statusId,
            paymentId
        };

        await api.put(`order/${order.id}`, data, {})
            .then(() => {
                toastSuccess();
                history.push('/pedidos');
            }).catch(() => {
                toastError();
            });
    }

    function toastSuccess() {
        toast.success('Pedido atualizado com sucesso!', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }

    function toastError() {
        toast.error('Erro ao atualizar o pedido, tente novamente.', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }

    return (
        <div className="editOrderContainer">
            <header>
                <h2>Editar Pedido</h2>
            </header>

            <div className="contentForm">
                <form onSubmit={handleEditOrder}>
                    <TextField
                        id="standard-basic"
                        label="Código do pedido"
                        margin="dense"
                        value={internalCode}
                        onChange={e => setInternalCode(e.target.value)}
                        className="locale"
                        disabled
                    />

                    <TextField
                        id="standard-select"
                        label="Status do Pedido"
                        className="payment"
                        margin="dense"
                        select
                        value={statusId}
                        onChange={e => setStatusId(e.target.value)}
                        required>
                        {status.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.status}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        id="standard-basic"
                        label="Local"
                        margin="dense"
                        value={locale}
                        onChange={e => setLocale(e.target.value)}
                        className="locale"
                        required
                    />

                    <InputLabel margin="dense">Itens do pedido</InputLabel>
                    <div className="items">
                        <List component="nav" className="selectedItemsList">
                            {selectedItems.map((selectedItem) => (
                                <ListItem key={selectedItem.id}>
                                    <ListItemText>{selectedItem.ItemsOrders.count} {selectedItem.name}</ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </div>

                    <TextField
                        id="standard-basic"
                        label="Observação"
                        className="observation"
                        multiline
                        margin="dense"
                        value={observation}
                        onChange={e => setObservation(e.target.value)}
                    />

                    <TextField
                        type="number"
                        id="standard-basic"
                        label="Total"
                        className="value"
                        margin="dense"
                        value={total}
                        onChange={e => setTotal(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">R$</InputAdornment>
                        }}
                    />

                    <TextField
                        id="standard-select"
                        label="Forma de Pagamento"
                        className="payment"
                        margin="dense"
                        select
                        value={paymentId}
                        onChange={e => setPaymentId(e.target.value)}
                        required>
                        {payments.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <div className="actions">
                        <Button type="submit" variant="contained" color="primary">Atualizar</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}