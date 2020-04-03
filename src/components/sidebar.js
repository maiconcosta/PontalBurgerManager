import React from 'react';
import logoImg from '../assets/logo.png';

import { Link } from 'react-router-dom';

import './styles.css';

export default function Sidebar(){ 

    return (
        <div className="sidebarContainer">
            <img src={logoImg} alt="Pontal Burger" className="logo" />

            <div className="menu">
                <Link to="/">Dashboard</Link>
                <Link to="/pedidos">Pedidos</Link>
                <Link to="/itens">Itens</Link>
                <Link to="/ingredients">Ingredientes</Link>
            </div>
        </div>
    )
}