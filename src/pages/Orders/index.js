import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';

import './styles.scss';

import api from '../../services/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    trackPromise(
      api.get('orders', {}).then((response) => {
        setOrders(response.data);
      }),
    );
  }, []);

  return (
    <div className="ordersContainer">
      <header>
        <h2>Pedidos</h2>
        <Link to="/pedidos/novo">
          <button className="newButton" type="button">
            Novo Pedido
          </button>
        </Link>
      </header>

      <ul>
        {orders.map((order) => (
          <Link
            to={{
              pathname: `/pedido/${order.id}`,
              state: { order },
            }}
          >
            <li key={order.id}>
              <h3>
                Pedido #
                {order.internalCode}
              </h3>
              <p>
                <b>Status:</b>
                {' '}
                {order.Status.status}
              </p>
              <p>
                <b>Local:</b>
                {' '}
                {order.locale}
              </p>
              <p>
                <b>Valor:</b>
                {' '}
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(order.total)}
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
