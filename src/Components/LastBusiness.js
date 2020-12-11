import { Container } from '@material-ui/core';
import React from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
const LastBusiness = (props) => {
    return (
        <Container style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <div>
                Clientes em andamento
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
                <Bar dataKey="Deals" fill="#8884d8" width={50} name="Negócios" />
            </BarChart>
        </Container>
    );
}

export default LastBusiness;