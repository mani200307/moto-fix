import React from 'react';
import { Link } from 'react-router-dom';

const MainHome = () => {
    return (
        <div className="flex bg-base-100 justify-center items-center w-full h-screen">
            <div className='flex-col cursor-context-menu text-center'>
                <h1 className='text-5xl'>MotoFix</h1>
                <h1 className='text-xl'>Fix your vehicles</h1>
                <div className='flex mt-5 gap-10'>
                    <Link to='/home'><button className='btn btn-primary'>Vehicle Owner</button></Link>
                    <Link to='/store'><button className='btn btn-primary'>Store Owner</button></Link>
                </div>
            </div>
            <footer className='fixed bottom-0'>
                Copyrights reserved @ Mani
            </footer>
        </div>
    );
}

export default MainHome;
