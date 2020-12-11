import { useEffect, useState } from "react";
import { AppBar, Box, Button, Container, Grid, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import LastLeads from "../../Components/LastLeads";
import LastBusiness from "../../Components/LastBusiness";
import LastBusinessClosed from "../../Components/LastBusinessClosed";
import api from "../../services/Api";
import Utils from "../../services/Utils";
import moment from "moment";
import DealChart from "../../Components/DealChart";

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
const DashBoard = ({ history }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [leadData, setLeadData] = useState(null);
    const [dealData, setDealData] = useState(null);
    const [allDeals, setAllDeals] = useState(null);
    const [dealsClosed, setDealsClosed] = useState([{ name: 'Hoje', 'Deals': 0 }, { name: 'Ontem', 'Deals': 0 }, { name: 'Ultimos dias', 'Deals': 0 }]);
    const classes = useStyles();

    useEffect(() => {
        const callApi = async () => {
            const responseLeads = await api.get(`leads?api_token=${Utils.apiToken}`);
            const dateAtual = moment().format('L');
            const dateYersterday = moment().subtract(1, 'days').format('L');
            const leads = responseLeads.data.data.reduce((data, lead) => {
                const date = lead['add_time'];
                const dateAtualLead = moment(date).format('L');
                //console.log("Data Lead", dateAtualLead)
                if (dateAtualLead == dateAtual) {
                    data[0]['Leads'] += 1;
                } else if (dateAtualLead == dateYersterday) {
                    data[1]['Leads'] += 1;
                } else {
                    data[2]['Leads'] += 1;
                }
                return data;
            }, [{ name: 'Hoje', 'Leads': 0 }, { name: 'Ontem', 'Leads': 0 }, { name: 'Ultimos dias', 'Leads': 0 }])
            setLeadData(leads);
            //
            //
            const responseDeals = await api.get(`deals?api_token=${Utils.apiToken}`)
            console.log(responseDeals.data.data)
            const deals = responseDeals.data.data.reduce((data, deal) => {
                const dateAtual = moment().format('L');
                const dateYersterday = moment().subtract(1, 'days').format('L');
                const date = deal['add_time'];
                console.log(deal['stage_id'])
                const dateAtualDeal = moment(date).format('L');
                if (dateAtualDeal == dateAtual) {
                    data[0]['Deals'] += 1;
                } else if (dateAtualDeal == dateYersterday) {
                    data[1]['Deals'] += 1;
                } else {
                    data[2]['Deals'] += 1;
                }
                return data
            }, [{ name: 'Hoje', 'Deals': 0 }, { name: 'Ontem', 'Deals': 0 }, { name: 'Ultimos dias', 'Deals': 0 }])
            setDealData(deals)

            //
            //


            const dealsClosedReduce = responseDeals.data.data.reduce((data, deal) => {
                const dateAtual = moment().format('L');
                const dateYersterday = moment().subtract(1, 'days').format('L');
                const date = deal['add_time'];
                const dealStatus = deal['status']
                const dateAtualDeal = moment(date).format('L');
                if (dealStatus != 'open') {
                    if (dateAtualDeal == dateAtual) {
                        data[0]['Deals'] += 1;
                    } else if (dateAtualDeal == dateYersterday) {
                        data[1]['Deals'] += 1;
                    } else {
                        data[2]['Deals'] += 1;
                    }
                }
                return data
            }, [{ name: 'Hoje', 'Deals': 0 }, { name: 'Ontem', 'Deals': 0 }, { name: 'Ultimos dias', 'Deals': 0 }])
            setDealsClosed(dealsClosedReduce)

            //
            //
            const allDeals = responseDeals.data.data.reduce((data, deal) => {
                console.log(deal['stage_id']);
                const dateAtualDeal = moment(deal['update_time']).format('L')
                switch (deal['stage_id']) {
                    case 1:
                        data[0]['Deals'] += 1
                        if (dateAtualDeal == dateAtual) {
                            data[0]['days'][0]['Deals'] += 1;
                        } else if (dateAtualDeal == dateYersterday) {
                            data[0]['days'][1]['Deals'] += 1;
                        } else {
                            data[0]['days'][2]['Deals'] += 1;
                        }
                        break;
                    case 2:
                        data[1]['Deals'] += 1
                        if (dateAtualDeal == dateAtual) {
                            data[1]['days'][0]['Deals'] += 1;
                        } else if (dateAtualDeal == dateYersterday) {
                            data[1]['days'][1]['Deals'] += 1;
                        } else {
                            data[1]['days'][2]['Deals'] += 1;
                        }
                        break;
                    case 3:
                        data[2]['Deals'] += 1
                        if (dateAtualDeal == dateAtual) {
                            data[2]['days'][0]['Deals'] += 1;
                        } else if (dateAtualDeal == dateYersterday) {
                            data[2]['days'][1]['Deals'] += 1;
                        } else {
                            data[2]['days'][2]['Deals'] += 1;
                        }
                        break;
                    case 4:
                        data[3]['Deals'] += 1
                        if (dateAtualDeal == dateAtual) {
                            data[3]['days'][0]['Deals'] += 1;
                        } else if (dateAtualDeal == dateYersterday) {
                            data[3]['days'][1]['Deals'] += 1;
                        } else {
                            data[3]['days'][2]['Deals'] += 1;
                        }
                        break;
                    case 5:
                        data[4]['Deals'] += 1
                        if (dateAtualDeal == dateAtual) {
                            data[4]['days'][0]['Deals'] += 1;
                        } else if (dateAtualDeal == dateYersterday) {
                            data[4]['days'][1]['Deals'] += 1;
                        } else {
                            data[4]['days'][2]['Deals'] += 1;
                        }
                        break;
                    default:
                        break;
                }
                return data
            }, [
                { name: 'Qualificado', 'Deals': 0, days: [{ name: 'Hoje', 'Deals': 0 }, { name: 'Ontem', 'Deals': 0 }, { name: 'Ultimos dias', 'Deals': 0 }] },
                { name: 'Contatado', 'Deals': 0, days: [{ name: 'Hoje', 'Deals': 0 }, { name: 'Ontem', 'Deals': 0 }, { name: 'Ultimos dias', 'Deals': 0 }] },
                { name: 'Demo Agendada', 'Deals': 0, days: [{ name: 'Hoje', 'Deals': 0 }, { name: 'Ontem', 'Deals': 0 }, { name: 'Ultimos dias', 'Deals': 0 }] },
                { name: 'Proposta Feita', 'Deals': 0, days: [{ name: 'Hoje', 'Deals': 0 }, { name: 'Ontem', 'Deals': 0 }, { name: 'Ultimos dias', 'Deals': 0 }] },
                { name: 'Negociações Iniciadas', 'Deals': 0, days: [{ name: 'Hoje', 'Deals': 0 }, { name: 'Ontem', 'Deals': 0 }, { name: 'Ultimos dias', 'Deals': 0 }] }
            ])
            setAllDeals(allDeals)
        };
        callApi()
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
                        <MenuItem onClick={() => handleClose('/deals')}>Negócios</MenuItem>
                        <MenuItem onClick={() => handleClose('/leads')}>Leads</MenuItem>
                        <MenuItem onClick={() => handleClose('/relatorys')}>Relatórios</MenuItem>
                    </Menu>
                    <Typography variant="h6" className={classes.title}>
                        Novidades
                </Typography>
                    <Button onClick={() => logOut()} color="inherit">Sair</Button>
                </Toolbar>
            </AppBar>
            <Grid container style={{ marginTop: 50 }}>
                <Grid item xs={12} md={4}  >
                    <LastLeads data={leadData} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <LastBusiness data={dealData} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <LastBusinessClosed data={dealsClosed} />
                </Grid>
            </Grid>
            <Grid container style={{ marginTop: 50 }}>
                <Grid item xs={12} md={12}  >
                    <DealChart data={allDeals} />
                </Grid>
            </Grid>
        </>
    )
}

export default DashBoard;