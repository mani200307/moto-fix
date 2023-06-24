import React from 'react'
import { Link } from 'react-router-dom';
import bike from '../../assets/bike.png'
import car from '../../assets/car.png'

const Controls = ({ location, locationChanged }) => {
   
    return (
        <div className='flex text-center justify-between items-center m-2 mx-10'>
            <Link className='mx-4 hover:bg-base-200 rounded-full' to='/search' state={{location : location, type: 'car'}}><img alt='car' src={car} width="100" height="100"/></Link>
            <Link className='mx-4 hover:bg-base-200 rounded-full' to='/search' state={{location : location, type: 'bike'}}><img alt='bike' src={bike} width="100" height="100"/></Link>
        </div>
    )
}

export default Controls