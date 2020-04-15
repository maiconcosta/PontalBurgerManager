import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';

import './styles.css';

import api from '../../services/api';

export default function Items() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        trackPromise(
            api.get('items', {
            }).then(response => {
                setItems(response.data);
            })
        );
    }, []);

    return (
        <div className="itemsContainer">
            <header>
                <h2>Cardápio</h2>
                <Link to="/cardapio-novo">
                    <button className="newButton">Novo Item</button>
                </Link>
            </header>

            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        <h3>{item.name}</h3>
                        <p><b>Valor:</b> {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(item.value)}</p>
                    </li>
                ))}
            </ul>

        </div>
    );
}