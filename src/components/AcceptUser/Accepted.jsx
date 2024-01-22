import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const Accepted = () => {

    const { state } = useLocation();
    const userDetails = state.userDetails;

    useEffect(() => {
        console.log(userDetails);
    }, [])

    return (
        <div className='flex flex-col w-screen mt-10 p-4 justify-center items-center'>
            <h1 className='text-2xl text-center'>Users Booked</h1>
            <div className='bg-base-200 w-full mt-3 rounded-lg p-2 flex flex-col items-center gap-2'>
                <h3 className='text-xl'>Name : {userDetails.username}</h3>
                <h3 className='text-lg'>Contact No : {userDetails.phnum}</h3>
            </div>
        </div>
    )
}

export default Accepted