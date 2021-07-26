import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Spinner } from 'react-bootstrap';


const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (auth.isLoading) {
                return (
                    <Spinner animation="border" role="status" variant="success">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                )
            }
            else if (auth.isAuthenticated) {
                return <Component {...props} />;
            }
            else {
                return <Redirect to={
                    {
                        pathname: '/login',
                        state: {
                            from: props.location
                        }
                    }
                } />
            }

        }}
    />
);

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);