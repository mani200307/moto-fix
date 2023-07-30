import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const Header = () => {
    const { curUser, logout } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                if (curUser) {
                    const q = query(collection(db, 'auth-user'), where('email', '==', curUser.email));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const username = querySnapshot.docs[0].data().username;
                        setUsername(username);
                    }
                }
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };

        if (curUser) {
            fetchUsername();
        }
    }, [curUser]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (err) {
            alert('Failed to log out');
        }
    };

    return (
        <div className="">
            <div className="flex justify-between m-10">
                <Link to="/home" className="text-3xl border-gray-100 ml-2 no-underline text-black">
                    MotoFix
                </Link>
                <div className="flex flex-col mt-1 items-center">
                    <div className="text-md">{username}</div>
                    <button
                        onClick={handleLogout}
                        className="text-sm mt-1 bg-base-300 p-1 rounded-lg border-gray-100 no-underline text-black"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
