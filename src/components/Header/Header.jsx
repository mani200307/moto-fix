import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import 'tailwindcss/tailwind.css';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [error, setError] = useState('')
    const { curUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        setError('');

        try {
            await logout();
            navigate('/');
        } catch (err) {
            setError('Failed to log out')
        }
    }

    return (
        <div className=''>
            <div className='flex justify-between m-10'>
                <Link to='/home' className='text-3xl border-gray-100 ml-2 no-underline text-black'>MotoFix</Link>
                <div className='flex flex-col mt-1 items-center'>
                    <div className='text-md'>{curUser.email}</div>
                    <button onClick={handleLogout} className='text-lg border-gray-100 no-underline text-black'>Log out</button>
                </div>
            </div>
        </div>
    )
}

export default Header