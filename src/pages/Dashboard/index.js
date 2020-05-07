import React, { useEffect, useState } from 'react';
import { endOfToday, format, parseISO, startOfToday, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import api from '../../services/api';

import './styles.scss';

export default function Dashboard() {
   const [count, setCount] = useState(0);
   const [totalValue, setTotalValue] = useState(0);
   const [totalItems, setTotalItems] = useState(0);

   const startDate = format(startOfToday(), 'yyyy/MM/dd HH:mm:ss');
   const endDate = format(endOfToday(), 'yyyy/MM/dd HH:mm:ss');
   const sevenDaysAgo = subDays(endDate, 7);

   const [lastSevenDays, setLastSevenDays] = useState([]);

    useEffect(() => {
        requestApiData();
    }, []);

    function requestApiData() {
        api.get(`reports/orders/counts?startDate=${startDate}&endDate=${endDate}`, {
        }).then(response => {
            const { count, totalValue, totalItems } = response.data;

            setCount(count);
            setTotalValue(totalValue);
            setTotalItems(totalItems);
        })

        api.get(`reports/orders/sevendays?startDate=${sevenDaysAgo}&endDate=${endDate}`, {
        }).then(response => {
            const sevenDays = response.data
                .map(day => ({
                    date: format(parseISO(day.date), 'iii', { locale: ptBR }),
                    Pedidos: day.orders
                }))
            setLastSevenDays(sevenDays);
        })
    }

    return (
        <div className="dashboardContainer">
            <header>
                <h2>Dashboard</h2>
            </header>

            <div className="indicatives">
                <div className="indicative">
                    <h3>{count ? count : '--'}</h3>
                    <p>Pedidos</p>
                </div>

                <div className="indicative">
                    <h3>{totalItems ? count : '--'}</h3>
                    <p>Itens Vendidos</p>
                </div>

                <div className="indicative">
                    <h3>{ totalValue ? Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValue) : '--'}</h3>
                    <p>Vendas</p>
                </div>
            </div>

            <div className="lastSevenDays">
                <h2>Últimos 7 dias</h2>
                <LineChart
                    width={1050}
                    height={300}
                    data={lastSevenDays}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Pedidos" stroke="#8884d8" activeDot={{ r: 8 }} />                    
                </LineChart>
            </div>

        </div>
    );
}