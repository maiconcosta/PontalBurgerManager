import React from 'react';
import logoImg from '../assets/logo.png';
import { FaBookOpen, FaFileInvoice, FaTachometerAlt } from 'react-icons/fa';

import { NavLink  } from 'react-router-dom';

import './styles.css';

export default function Sidebar() {

    return (
        <div className="sidebarContainer">
            <img src={logoImg} alt="Pontal Burger" className="logo" />

            <div className="menu">
                <NavLink to="/home" activeClassName="active">
                    <i><FaTachometerAlt /></i>
                    Dashboard
                </NavLink >
                <NavLink to="/pedidos" activeClassName="active">
                    <i><FaFileInvoice /></i> Pedidos
                </NavLink>
                <NavLink to="/cardapio" activeClassName="active">
                    <i><FaBookOpen /></i> Cardápio
                </NavLink>                
            </div>
        </div>
    )
}