import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import { addMinutes, format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { FaArrowRight } from 'react-icons/fa';

import './styles.scss';

import api from '../../services/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  function setTimezone(date) {
    const timezone = process.env.REACT_APP_TIMEZONE;
    const newDate = format(utcToZonedTime(date, timezone), 'dd/MM/yyyy HH:mm');
    return newDate;
  }

  function setDeadline(date, deadline) {
    const deadlineDate = format(addMinutes(parseISO(date), deadline), 'HH:mm');
    return deadlineDate;
  }

  useEffect(() => {
    trackPromise(
      api.get('orders', {}).then((response) => {
        const data = response.data
          .map(({ createdAt, deadline, ...rest }) => ({
            createdAt: setTimezone(createdAt),
            deadline,
            deadlineDate: setDeadline(createdAt, deadline || 40),
            rest,
          }));

        setOrders(data);
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
            key={order.rest.id}
            to={{
              pathname: `/pedido/${order.rest.id}`,
              state: { order },
            }}
          >
            <li key={order.rest.id}>
              <div className="headerCardOrder">
                <h3>
                  Pedido #
                  {order.rest.internalCode}
                </h3>
                <p
                  className={
                     `${order.rest.Status.id === 1 ? 'started' : ''}
                      ${order.rest.Status.id === 2 ? 'preparing' : ''}
                      ${order.rest.Status.id === 3 ? 'outForDelivery' : ''}
                      ${order.rest.Status.id === 4 ? 'finished' : ''}
                      ${order.rest.Status.id === 5 ? 'canceled' : ''}`
                  }
                >
                  {order.rest.Status.status}
                </p>
              </div>
              <p>
                Data e hora do pedido:
                {' '}
                {order.createdAt}
              </p>
              <p>
                Entregar até:
                {' '}
                {order.deadlineDate}
              </p>
              <p>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(order.rest.total)}
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
