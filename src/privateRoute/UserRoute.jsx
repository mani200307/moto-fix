import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UserRoute = ({ component: Component, ...rest }) => {
    const { curUser } = useAuth();

    return curUser ? <Outlet /> : <Navigate to="/login" />
}

export default UserRoute;