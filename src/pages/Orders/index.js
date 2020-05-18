import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { FaArrowRight } from 'react-icons/fa';

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

  function setTimezone(date) {
    const timezone = process.env.REACT_APP_TIMEZONE;
    const newDate = format(utcToZonedTime(date, timezone), 'HH:mm');
    return newDate;
  }

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
            key={order.id}
            to={{
              pathname: `/pedido/${order.id}`,
              state: { order },
            }}
          >
            <li key={order.id}>
              <div className="headerCardOrder">
                <h3>
                  Pedido #
                  {order.internalCode}
                </h3>
                <p
                  className={
                     `${order.Status.id === 1 ? 'started' : ''}
                      ${order.Status.id === 2 ? 'preparing' : ''}
                      ${order.Status.id === 3 ? 'outForDelivery' : ''}
                      ${order.Status.id === 4 ? 'finished' : ''}
                      ${order.Status.id === 5 ? 'canceled' : ''}`
                  }
                >
                  {order.Status.status}
                </p>
              </div>
              <p>
                Horário do pedido:
                {' '}
                {setTimezone(order.createdAt)}
              </p>
              <p>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(order.total)}
              </p>
              <div className="footerCardOrder">
                <p>
                  Visualizar detalhes
                </p>
                <i>
                  <FaArrowRight />
                </i>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
