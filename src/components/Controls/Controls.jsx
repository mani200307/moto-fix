import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Controls = ({ location, locationChanged }) => {
   
    return (
        <div className='flex text-center justify-between m-2 mx-10'>
            <Link className='mx-4' to='/search' state={{location : location, type: 'car'}}><img alt='car' src='https://static.vecteezy.com/system/resources/previews/003/694/243/original/car-icon-in-flat-style-simple-traffic-icon-free-vector.jpg' width="100" height="100"/></Link>
            <Link className='mx-4' to='/search' state={{location : location, type: 'bike'}}><img alt='bike' src='https://png.pngtree.com/png-clipart/20200224/original/pngtree-motorcycle-transportation-icons-vector-png-image_5224053.jpg' width="100" height="100"/></Link>
        </div>
    )
}

export default Controls