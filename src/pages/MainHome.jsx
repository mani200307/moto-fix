import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MainHome = () => {
    return (
        <div className="flex flex-col h-screen md:flex-row">
            <Link to='/home'><Button>Vehicle Owner</Button></Link>
            <Link to='/store'><Button>Store Owner</Button></Link>
        </div>
    )
}

export default MainHome