import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../../store';
import { fetchAllItems } from '../../store/thunks/items';

import './styles.scss';

function Items({ items }) {
  useEffect(() => {
    trackPromise(
      store.dispatch(fetchAllItems()),
    );
  }, []);

  return (
    <div className="itemsContainer">
      <header>
        <h2>Cardápio</h2>
        <Link to="/cardapio/novo">
          <button className="newButton" type="button">Novo Item</button>
        </Link>
      </header>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>
              <b>Valor:</b>
              {' '}
              {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.value)}
            </p>
          </li>
        ))}
      </ul>

    </div>
  );
}

Items.propTypes = {
  items: PropTypes.shape.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.items,
});

export default connect(
  mapStateToProps,
)(Items);
