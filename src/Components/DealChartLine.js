import { Container } from '@material-ui/core';
import React from 'react';
import {
    CartesianGrid,
    Legend,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Line
} from 'recharts';

const DealChartLine = (props) => {
    return (
        <Container style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <div>
                Resumo dos Negócios (Gráfico em Linha)
             </div>
            <ResponsiveContainer width={'100%'} height={300}>
                <LineChart
                    width={500}
                    height={300}
                    data={props.data}
                    margin={{
                        top: 50, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="num" stroke="#8884d8" activeDot={{ r: 8 }} name="Leads" />
                </LineChart>
            </ResponsiveContainer>

        </Container>

    );
}


export default DealChartLine;