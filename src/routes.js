import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Items from './pages/Items';
import NewItem from './pages/NewItem';
import NewOrder from './pages/NewOrder';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Dashboard} />
            
            <Route exact path="/pedidos" component={Orders} />
            <Route path="/pedidos/novo" component={NewOrder} />
            
            <Route exact path="/cardapio" component={Items} />
            <Route path="/cardapio/novo" exact component={NewItem} />
        </Switch>
    );
}