import { Container } from '@material-ui/core';
import React from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
const LastLeads = (props) => {
    return (
        <Container style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <div>
                Futuros Clientes
            </div>
            <BarChart
                width={350}
                height={300}
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
                <Bar dataKey="Leads" fill="#8884d8" width={50} name="Clientes" />
            </BarChart>
        </Container>
    );
}

export default LastLeads;