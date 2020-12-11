import { BrowserRouter, Switch, Route } from 'react-router-dom';
import DashBoard from '../pages/DashBoard/index';
import Deal from '../pages/Deal/index';
import Lead from '../pages/Lead/index';
import Login from '../pages/Login/index';
import Register from '../pages/Register';
import PrivateRoute from './PrivateRoute';
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <PrivateRoute exact path="/" component={DashBoard} />
            <PrivateRoute exact path="/deals" component={Deal} />
            <PrivateRoute exact path="/leads" component={Lead} />
            <PrivateRoute exact path="/relatory" component={DashBoard} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path="*" component={() => <h1>Erro 404</h1>} />
        </Switch>
    </BrowserRouter>
)

export default Routes;