import React from 'react';
import {
  FaBookOpen, FaFileInvoice, FaTachometerAlt, FaSignOutAlt,
} from 'react-icons/fa';

import { NavLink } from 'react-router-dom';
import logoImg from '../assets/logo.png';

export default function Sidebar() {
  return (
    <div className="sidebarContainer">
      <img src={logoImg} alt="Pontal Burger" className="logo" />

      <div className="menu">
        <NavLink to="/home" activeClassName="active">
          <i>
            <FaTachometerAlt />
          </i>
          Dashboard
        </NavLink>
        <NavLink to="/pedidos" activeClassName="active">
          <i>
            <FaFileInvoice />
          </i>
          Pedidos
        </NavLink>
        <NavLink to="/cardapio" activeClassName="active">
          <i>
            <FaBookOpen />
          </i>
          Cardápio
        </NavLink>
        <NavLink
          exact
          to={{
            pathname: '/',
            state: 'logout',
          }}
        >
          <i>
            <FaSignOutAlt />
          </i>
          Sair
        </NavLink>
      </div>
    </div>
  );
}
