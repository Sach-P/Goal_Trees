import React, { Component, Fragment } from "react";
import ReactDOM from 'react-dom';


import { Provider } from "react-redux";
import store from '../store';
import { loadUser } from "../actions/auth";

import Dashboard from "./layout/Dashboard";
import Login from './accounts/Login';
import Register from './accounts/Register';
import PrivateRoute from "./common/PrivateRoute";
import Alerts from "./layout/Alerts";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import NotFound from "./common/NotFound";

// Alert Options
const alertOptions = {
    timeout: 3000,
    position: 'bottom right',
};

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <Alerts />
                            <Switch>
                                <Redirect exact from="/" to="/home" />
                                <PrivateRoute path="/home" component={Dashboard} />
                                <Route exact path="/register" component={Register} />
                                <Route exact path="/login" component={Login} />
                                <Route component={NotFound} />
                            </Switch>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));