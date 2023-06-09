import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const StoreRoute = ({ component: Component, ...rest }) => {
    const { curUser } = useAuth();

    return curUser ? <Outlet /> : <Navigate to="/store/login" />
}

export default StoreRoute;