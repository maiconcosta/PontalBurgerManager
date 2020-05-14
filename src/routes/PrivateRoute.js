import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import Loading from '../components/loading';
import Sidebar from '../components/sidebar';

import '../components/styles.scss';

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ component: Component, ...rest }) {
  const token = localStorage.getItem('token');

  return (
    <Route
      rest={rest}
      render={(props) => (token ? (
        <div className="baseContainer">
          <div className="side">
            <Sidebar />
          </div>
          <div className="content">
            <Component props={props} />
            <Loading />
          </div>
        </div>
      ) : (
        // eslint-disable-next-line react/prop-types
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      ))}
    />
  );
}
