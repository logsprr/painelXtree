import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import api from '../../services/Api';
import Utils from '../../services/Utils';
import { AppBar, Button, Grid, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import moment from 'moment';
const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'title', headerName: 'NAME', width: 130 },
    { field: 'date_create', headerName: 'DATE', width: 130 },
    { field: 'value', headerName: 'VALUE', width: 130 },
    { field: 'source', headerName: 'SOURCE', width: 130 },
];
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        color: 'white',
        '& .MuiCheckbox-root': {
            color: 'white',
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));
const Lead = ({ history }) => {
    const [leadData, setLeadData] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    useEffect(async () => {
        const responseLeads = await api.get(`leads?api_token=${Utils.apiToken}`)
        console.log(responseLeads.data.data)
        const leads = responseLeads.data.data.map(item => {
            return {
                id: item.id,
                title: item.title,
                date_create: moment(item.add_time).format('L'),
                value: item.value == null ? 0 : item.value,
                source: item.source_name == 'API' ? 'FORM' : item.source_name
            }
        })
        setLeadData(leads)
    }, [])
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (route) => {
        setAnchorEl(null);
        history.push(route)
    };
    const logOut = () => {
        localStorage.removeItem('TOKEN');
        history.push('/login')
    }
    return (

        <>
            <AppBar position="static" style={{ backgroundColor: '#021E19', color: 'white' }} >
                <Toolbar>
                    <IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => handleClose('/')}>DashBoard</MenuItem>
                        <MenuItem onClick={() => handleClose('/deals')}>Negócios</MenuItem>
                        <MenuItem onClick={() => handleClose('/leads')}>Leads</MenuItem>
                        <MenuItem onClick={() => handleClose('/relatory')}>Relatórios</MenuItem>
                    </Menu>
                    <Typography variant="h6" className={classes.title}>
                        Clientes(Leads)
                </Typography>
                    <Button onClick={() => logOut()} color="inherit">Sair</Button>
                </Toolbar>
            </AppBar>
            <Grid container >
                <Grid item xs={12} md={12} style={{ margin: '50px' }} >
                    <div>
                        <div style={{ height: '80vh', width: '100%' }} >
                            {leadData != null && <DataGrid className={classes.root} rows={leadData} columns={columns} pageSize={15} checkboxSelection />}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </>

    )
}

export default Lead;