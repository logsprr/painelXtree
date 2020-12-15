import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import api from '../../services/Api';
import Utils from '../../services/Utils';
import { AppBar, Button, Grid, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import moment from 'moment';
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'currency', headerName: 'CURRENCY', width: 130 },
    { field: 'formatted_value', headerName: 'VALUE', width: 150 },
    { field: 'person_name', headerName: 'NAME', width: 130 },
    { field: "creator_user_id_name", headerName: 'CREATOR', width: 150 },
    { field: "creator_user_id_email", headerName: 'EMAIL', width: 250 },
    { field: "date_create", headerName: 'DATE', width: 150 },
    { field: "status", headerName: 'STATUS', width: 150 },

];
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        color: 'white',
        '& .MuiCheckbox-root': {
            color: 'white',
        },
        '& .MuiTablePagination-root': {
            color: 'white',
        },
        '& .MuiButtonBase-root.Mui-disabled': {
            color: '#ddd',
        },
        '& .MuiIconButton-colorInherit': {
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
const Deal = ({ history }) => {
    const [dealData, setDealData] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    useEffect(async () => {
        const responseDeals = await api.get(`deals?api_token=${Utils.apiToken}`);
        console.log(responseDeals.data.data)
        const deals = responseDeals.data.data.map(item => {
            return {
                id: item.id,
                currency: item.currency,
                formatted_value: item.formatted_value,
                person_name: item.person_name,
                creator_user_id_name: item.creator_user_id['name'],
                creator_user_id_email: item.creator_user_id['email'],
                date_create: moment(item.add_time).format('L'),
                status:
                    item.stage_id == 1 ? 'Qualificado'
                        : item.stage_id == 2 ? 'Contatado'
                            : item.stage_id == 3 ? 'Demo Agendada'
                                : item.stage_id == 4 ? 'Proposta Feita'
                                    : item.stage_id == 5 ? 'Negociações Iniciadas'
                                        : 'Sem status'
            }
        })
        console.log(deals)
        setDealData(deals)
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
                        Negócios
                </Typography>
                    <Button onClick={() => logOut()} color="inherit">Sair</Button>
                </Toolbar>
            </AppBar>
            <Grid container >
                <Grid item xs={12} md={12} style={{ margin: '50px' }} >
                    <div>
                        <div style={{ height: '80vh', width: '100%' }} >
                            {dealData != null && <DataGrid className={classes.root} rows={dealData} columns={columns} pageSize={15} checkboxSelection />}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </>

    )
}

export default Deal;