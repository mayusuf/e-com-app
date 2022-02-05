import React from 'react';
import { Navigate, Outlet } from 'react-router';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    const { isAuthorized } = useAuth();
    return (
        <Outlet
            {...rest}
            render={({ location }) => isAuthorized === true ? children : <Navigate
                to={{
                    pathname: "/login",
                    state: { from: location }
                }}
            ></Navigate>}
        >

        </Outlet>
    );
};

export default PrivateRoute;