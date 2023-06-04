import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MainHome = () => {
    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div className='flex-col text-center'>
                <h1 className='p-10'>MotoFix</h1>
                <div className='flex gap-10'>
                    <Link to='/home'><Button>Vehicle Owner</Button></Link>
                    <Link to='/store'><Button>Store Owner</Button></Link>
                </div>
            </div>
        </div>
    )
}

export default MainHome