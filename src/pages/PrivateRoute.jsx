import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { curUser } = useAuth();

    return curUser ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute;
