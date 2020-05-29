import React, { useEffect, useState } from 'react';

import {
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { toastSuccess, toastError } from '../../components/toast';

import './styles.scss';

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
  const [deadline, setDeadline] = useState('');

  const [selectedItems, setSelectedItems] = useState([]);
  const deadlineOptions = [
    {
      name: '10 a 20',
      value: 20,
    },
    {
      name: '20 a 30',
      value: 30,
    },
    {
      name: '30 a 40',
      value: 40,
    },
    {
      name: '40 a 50',
      value: 50,
    },

    {
      name: '50 a 60',
      value: 60,
    },
    {
      name: '60 a 70',
      value: 70,
    },
  ];

  async function requestApiData() {
    api
      .get('payments', {})
      .then((response) => {
        setPayments(response.data);
      })
      .catch(() => {
        toastError('Ocorreu um erro ao recuperar os dados, tente novamente.');
      });

    api
      .get('status', {})
      .then((response) => {
        setStatus(response.data);
      })
      .catch(() => {
        toastError('Ocorreu um erro ao recuperar os dados, tente novamente.');
      });
  }

  useEffect(() => {
    setLocale(order.rest.locale);
    setInternalCode(order.rest.internalCode);
    setObservation(order.rest.observation);
    setPaymentId(order.rest.paymentId);
    setStatusId(order.rest.statusId);
    setDeadline(order.deadline);
    setTotal(order.rest.total);
    setSelectedItems(order.rest.items);

    requestApiData();
  }, [order]);

  async function handleEditOrder(e) {
    e.preventDefault();

    const data = {
      locale,
      observation,
      total,
      statusId,
      paymentId,
      deadline,
    };

    await api
      .put(`order/${order.rest.id}`, data, {})
      .then(() => {
        toastSuccess('Pedido atualizado com sucesso!');
        history.push('/pedidos');
      })
      .catch(() => {
        toastError('Erro ao atualizar o pedido, tente novamente.');
      });
  }

  return (
    <div className="editOrderContainer">
      <header>
        <h2>Editar Pedido</h2>
      </header>

      <div className="contentForm">
        <form onSubmit={handleEditOrder}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                label="Código do pedido"
                margin="dense"
                value={internalCode}
                onChange={(e) => setInternalCode(e.target.value)}
                fullWidth
                disabled
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Local"
                margin="dense"
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label="Tempo para entrega em minutos"
                margin="dense"
                select
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                fullWidth
                required
              >
                {deadlineOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <InputLabel margin="dense">Itens do pedido</InputLabel>
              <div className="items">
                <List component="nav" className="selectedItemsList">
                  {selectedItems.map((selectedItem) => (
                    <ListItem key={selectedItem.id}>
                      <ListItemText>
                        {selectedItem.ItemsOrders.count}
                        {' '}
                        {selectedItem.name}
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </div>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Observação"
                multiline
                margin="dense"
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                type="number"
                label="Total"
                margin="dense"
                fullWidth
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label="Forma de Pagamento"
                margin="dense"
                select
                value={paymentId}
                onChange={(e) => setPaymentId(e.target.value)}
                fullWidth
                required
              >
                {payments.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={3}>
              <TextField
                label="Status do Pedido"
                margin="dense"
                select
                value={statusId}
                onChange={(e) => setStatusId(e.target.value)}
                fullWidth
                required
              >
                {status.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

          </Grid>

          <div className="actions">
            <Button type="submit" variant="contained" color="primary">
              Atualizar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
