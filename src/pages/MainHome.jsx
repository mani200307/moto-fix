import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/bg.png';

const MainHome = () => {
    return (
        <div className="flex justify-center items-center w-full h-screen" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', filter: 'brightness(1.2)' }}>
            <div className='flex-col text-center'>
                <h1 className='p-10 text-5xl'>MotoFix</h1>
                <div className='flex gap-10'>
                    <Link to='/home'><Button>Vehicle Owner</Button></Link>
                    <Link to='/store'><Button>Store Owner</Button></Link>
                </div>
            </div>
            <footer className='fixed bottom-0'>
                Copyrights reserved @ Mani
            </footer>
        </div>
    );
}

export default MainHome;
