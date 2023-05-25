import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import 'tailwindcss/tailwind.css';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

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
            <div className='flex justify-between items-center m-10'>
                <div className='text-3xl'>MotoFix</div>
                <div className='flex items-center'>
                    <div className='text-lg'>{ curUser.email }</div>
                    <Button variant='link' onClick={handleLogout} className='text-xl border-gray-100 ml-2 no-underline text-black'>Log out</Button>
                </div>
            </div>
            <div className='mx-10 my-2'>
                {/* <input type='text' className='bg-gray-100 w-full rounded-xl p-2'/> */}
            </div>
        </div>
    )
}

export default Header