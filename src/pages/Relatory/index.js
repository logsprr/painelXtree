import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import api from '../../services/Api';
import Utils from '../../services/Utils';
import { AppBar, Button, Grid, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'title', headerName: 'NAME', width: 130 },
    { field: 'add_time', headerName: 'DATE', width: 130 },
];
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));
const Relatory = ({ history }) => {
    const [leadData, setLeadData] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    useEffect(async () => {
        const responseLeads = await api.get(`leads?api_token=${Utils.apiToken}`)
        console.log(responseLeads.data.data)
        const leads = responseLeads.data.data;
        console.log(leads)
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
                        Relatórios
                </Typography>
                    <Button onClick={() => logOut()} color="inherit">Sair</Button>
                </Toolbar>
            </AppBar>
        </>

    )
}

export default Relatory;