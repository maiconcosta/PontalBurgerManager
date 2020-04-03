import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Items from './pages/Items';
import Ingredients from './pages/Ingredients';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/pedidos" component={Orders} />
            <Route path="/itens" component={Items} />
            <Route path="/ingredients" component={Ingredients} />
        </Switch>

    );
}