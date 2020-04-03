import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../routes';

import Sidebar from './sidebar';

import './styles.css';

export default function Base() {
    return (
        <BrowserRouter>
            <div className="baseContainer">
                <div className="side">
                    <Sidebar />
                </div>
                <div className="content">
                    <Routes />
                </div>
            </div>
        </BrowserRouter>
    );
}