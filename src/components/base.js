import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { usePromiseTracker } from "react-promise-tracker";

import GridLoader from 'react-spinners/GridLoader';

import Routes from '../routes';

import Sidebar from './sidebar';

import './styles.css';

const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress &&
        <div className="loader">
            <GridLoader
                size={15}
                color={"#999"}
                loading
            />
        </div>        
    );
}

export default function Base() {
    return (
        <BrowserRouter>
            <div className="baseContainer">
                <div className="side">
                    <Sidebar />
                </div>
                <div className="content">
                    <Routes />
                    <LoadingIndicator />
                </div>
            </div>
        </BrowserRouter>
    );
}