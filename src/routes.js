import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Items from './pages/Items';
import EditOrder from './pages/EditOrder';
import NewItem from './pages/NewItem';
import NewOrder from './pages/NewOrder';

export default function Routes() {
  return (
    <Switch>
      <Route path="/home" exact component={Dashboard} />

      <Route exact path="/pedidos" component={Orders} />
      <Route path="/pedidos/novo" component={NewOrder} />
      <Route path="/pedido/:id" component={EditOrder} />

      <Route exact path="/cardapio" component={Items} />
      <Route path="/cardapio/novo" exact component={NewItem} />
    </Switch>
  );
}
