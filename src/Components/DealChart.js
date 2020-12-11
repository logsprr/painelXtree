import { Container } from '@material-ui/core';
import React from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
const DealChart = (props) => {
    console.log(props.data != undefined ? props.data[0]['days'][1]['Deals'] = 7 : null)
    return (
        <Container style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <div>
                Resumo dos Negócios
             </div>
            <ResponsiveContainer width={'100%'} height={300}>
                <BarChart
                    data={props.data}
                    margin={{
                        top: 50, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {/* <Bar dataKey="Qualificado" fill="#8884d8" width={50} /> */}
                    <Bar dataKey="['days'][0]['Deals']" fill="#27ae60" width={50} name="Hoje" />
                    <Bar dataKey="['days'][1]['Deals']" fill="#9b59b6" width={50} name="Ontem" />
                    <Bar dataKey="['days'][2]['Deals']" fill="#3498db" width={50} name="Ultimos dias" />
                    {/* <Bar dataKey="Negociações Iniciadas" fill="#2c3e50" width={50} /> */}
                </BarChart>
            </ResponsiveContainer>

        </Container>

    );
}


export default DealChart;