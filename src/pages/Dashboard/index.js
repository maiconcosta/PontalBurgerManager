import React, { useEffect, useState } from 'react';
import { endOfToday, format, startOfToday } from 'date-fns'

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import api from '../../services/api';

import './styles.css';

const data = [
    {
        day: 'Dom', pedidos: 88, amt: 2400,
    },
    {
        day: 'Seg', pedidos: 55, amt: 2210,
    },
    {
        day: 'Ter', pedidos: 52, amt: 2290,
    },
    {
        day: 'Qua', pedidos: 39, amt: 2000,
    },
    {
        day: 'Qui', pedidos: 47, amt: 2181,
    },
    {
        day: 'Sex', pedidos: 63, amt: 2500,
    },
    {
        day: 'Sáb', pedidos: 71, amt: 2100,
    },
];

export default function Dashboard() {
   const [count, setCount] = useState(0);
   const [totalValue, setTotalValue] = useState(0);
   const [totalItems, setTotalItems] = useState(0);
   const startDate = format(startOfToday(), 'yyyy/MM/dd HH:mm:ss');
   const endDate = format(endOfToday(), 'yyyy/MM/dd HH:mm:ss');

    useEffect(() => {
        api.get(`reports/orders/counts?startDate=${startDate}&endDate=${endDate}`, {
        }).then(response => {
            const { count, totalValue, totalItems } = response.data;

            setCount(count);
            setTotalValue(totalValue);
            setTotalItems(totalItems);
        })
    }, [startDate, endDate]);

    return (
        <div className="dashboardContainer">
            <header>
                <h2>Dashboard</h2>
            </header>

            <div className="indicatives">
                <div className="indicative">
                    <h3>{count}</h3>
                    <p>Pedidos</p>
                </div>

                <div className="indicative">
                    <h3>{totalItems}</h3>
                    <p>Itens Vendidos</p>
                </div>

                <div className="indicative">
                    <h3>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValue)}</h3>
                    <p>Vendas</p>
                </div>
            </div>

            <div className="lastSevenDays">
                <LineChart
                    width={1050}
                    height={300}
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pedidos" stroke="#8884d8" activeDot={{ r: 8 }} />                    
                </LineChart>
            </div>

        </div>
    );
}