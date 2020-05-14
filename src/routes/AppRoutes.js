import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Orders from '../pages/Orders';
import Items from '../pages/Items';
import EditOrder from '../pages/EditOrder';
import NewItem from '../pages/NewItem';
import NewOrder from '../pages/NewOrder';

import PrivateRoute from './PrivateRoute';

import '../components/styles.scss';

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />

          <PrivateRoute path="/home" exact component={Dashboard} />

          <PrivateRoute exact path="/pedidos" component={Orders} />
          <PrivateRoute path="/pedidos/novo" component={NewOrder} />
          <PrivateRoute path="/pedido/:id" component={EditOrder} />

          <PrivateRoute exact path="/cardapio" component={Items} />
          <PrivateRoute path="/cardapio/novo" exact component={NewItem} />
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
