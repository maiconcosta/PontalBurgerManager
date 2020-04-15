import React from 'react';
import logoImg from '../assets/logo.png';
import { FaBookOpen, FaFileInvoice, FaTachometerAlt } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import './styles.css';

export default function Sidebar() {

    return (
        <div className="sidebarContainer">
            <img src={logoImg} alt="Pontal Burger" className="logo" />

            <div className="menu">
                <Link to="/">
                    <i><FaTachometerAlt /></i>
                    Dashboard
                </Link>
                <Link to="/pedidos">
                    <i><FaFileInvoice /></i> Pedidos
                </Link>
                <Link to="/cardapio">
                    <i><FaBookOpen /></i> Cardápio
                </Link>                
            </div>
        </div>
    )
}