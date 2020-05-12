import React, { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

import {
  Button,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.scss';

import api from '../../services/api';

const toastSuccess = () => {
  toast.success('Pedido cadastrado com sucesso!', {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

const toastError = () => {
  toast.error('Erro ao cadastrar o pedido, tente novamente.', {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export default function NewOrder() {
  const [locale, setLocale] = useState('');
  const [internalCode, setInternalCode] = useState('');
  const [observation, setObservation] = useState('');
  const [total, setTotal] = useState(0);
  const statusId = 1;
  const [paymentId, setPaymentId] = useState('');
  const [payments, setPayments] = useState([]);

  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [countedSelectedItems, setCountedSelectedItems] = useState([]);

  const history = useHistory();

  async function requestApiData() {
    api
      .get('items', {})
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });

    api
      .get('payments', {})
      .then((response) => {
        setPayments(response.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
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
      items: countedSelectedItems,
    };

    await api
      .post('order', data, {})
      .then(() => {
        toastSuccess();
        history.push('/pedidos');
      })
      .catch(() => {
        toastError();
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
          <TextField
            id="standard-basic"
            label="Código do pedido"
            margin="dense"
            value={internalCode}
            onChange={(e) => setInternalCode(e.target.value)}
            className="locale"
            required
          />

          <TextField
            id="standard-basic"
            label="Local"
            margin="dense"
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            className="locale"
            required
          />

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

          <TextField
            id="standard-basic"
            label="Observação"
            className="observation"
            multiline
            margin="dense"
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
          />

          <TextField
            type="number"
            id="standard-basic"
            label="Total"
            className="value"
            margin="dense"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
          />

          <TextField
            id="standard-select"
            label="Forma de Pagamento"
            className="payment"
            margin="dense"
            select
            value={paymentId}
            onChange={(e) => setPaymentId(e.target.value)}
            required
          >
            {payments.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>

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
