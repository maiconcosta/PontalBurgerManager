import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/fa';
import {
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField,
} from '@material-ui/core';

import { toastSuccess, toastError } from '../../components/toast';

import api from '../../services/api';

import './styles.scss';

export default function NewOrder() {
  const [locale, setLocale] = useState('');
  const [internalCode, setInternalCode] = useState('');
  const [observation, setObservation] = useState('');
  const [total, setTotal] = useState(0);
  const statusId = 2;
  const [paymentId, setPaymentId] = useState('');
  const [payments, setPayments] = useState([]);
  const [deadline, setDeadline] = useState('');

  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [countedSelectedItems, setCountedSelectedItems] = useState([]);

  const history = useHistory();
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
      .get('items', {})
      .then((response) => {
        setItems(response.data);
      })
      .catch(() => {
        toastError('Ocorreu um erro ao recuperar os dados, tente novamente.');
      });

    api
      .get('payments', {})
      .then((response) => {
        setPayments(response.data);
      })
      .catch(() => {
        toastError('Ocorreu um erro ao recuperar os dados, tente novamente.');
      });
  }

  useEffect(() => {
    requestApiData();
    setInternalCode(Math.floor(1000 + Math.random() * 9000));
  }, []);

  useEffect(() => {
    const filterSelectedItems = selectedItems.filter(
      (item, index, array) => array.indexOf(item) === index,
    );

    const counts = filterSelectedItems.map((filterItem) => ({
      id: filterItem.id,
      count: selectedItems.filter((item) => item.id === filterItem.id).length,
      name: filterItem.name,
      value:
        filterItem.value
        * selectedItems.filter((item) => item.id === filterItem.id).length,
    }));

    setCountedSelectedItems(counts);
  }, [selectedItems]);

  async function handleNewOrder(e) {
    e.preventDefault();

    const data = {
      locale,
      observation,
      total,
      statusId,
      paymentId,
      internalCode,
      deadline,
      items: countedSelectedItems,
    };

    await api
      .post('order', data, {})
      .then(() => {
        toastSuccess('Pedido cadastrado com sucesso!');
        history.push('/pedidos');
      })
      .catch(() => {
        toastError('Erro ao cadastrar o pedido, tente novamente.');
      });
  }

  function handleSelectItem(item) {
    setSelectedItems([...selectedItems, item]);
    setTotal(total + item.value);
  }

  function handleRemoveSelectItem(item) {
    const leftoverItems = selectedItems.filter(
      (selectedItem) => selectedItem.id !== item.id,
    );

    setSelectedItems(leftoverItems);
    setTotal(total - item.value);
  }

  return (
    <div className="newOrderContainer">
      <header>
        <h2>Novo Pedido</h2>
      </header>

      <div className="contentForm">
        <form onSubmit={handleNewOrder}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                label="Código do pedido"
                margin="dense"
                value={internalCode}
                onChange={(e) => setInternalCode(e.target.value)}
                fullWidth
                required
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
                label="Tempo para entrega"
                className="deadline"
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
              <div className="items">
                <InputLabel margin="dense">Selecione os itens</InputLabel>
                <InputLabel margin="dense">Itens selecionados</InputLabel>
                <List component="nav" className="itemsList">
                  {items.map((item) => (
                    <ListItem
                      key={item.id}
                      onClick={() => handleSelectItem(item)}
                      button
                    >
                      <ListItemText
                        primary={item.name}
                        secondary={(
                          <>
                            <p>{item.description}</p>
                            <span>
                              {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              }).format(item.value)}
                            </span>
                          </>
                      )}
                      />
                      <ListItemIcon>
                        <FaPlus />
                      </ListItemIcon>
                    </ListItem>
                  ))}
                </List>

                <List component="nav" className="selectedItemsList">
                  {countedSelectedItems.map((selectedItem) => (
                    <ListItem
                      key={selectedItem.id}
                      onClick={() => handleRemoveSelectItem(selectedItem)}
                      button
                    >
                      <ListItemText>
                        {selectedItem.count}
                        {' '}
                        {selectedItem.name}
                      </ListItemText>
                      <ListItemIcon>
                        <FaMinus />
                      </ListItemIcon>
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
                id="standard-select"
                label="Forma de Pagamento"
                className="payment"
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
                type="number"
                id="standard-basic"
                label="Total"
                className="value"
                margin="dense"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <div className="actions">
            <Button type="submit" variant="contained" color="primary">
              Cadastrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
