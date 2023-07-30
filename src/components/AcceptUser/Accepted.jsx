import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const Accepted = () => {

    const { state } = useLocation();
    const userDetails = state.userDetails;

    useEffect(() => {
        console.log(userDetails);
    }, [])

    return (
        <div className='flex flex-col mt-10 justify-center items-center'>
            <h1 className='text-xl'>Booked by</h1>
            <div className='bg-base-200 w-fit rounded-lg p-2 flex flex-col items-center gap-2'>
                <h3>{userDetails.username}</h3>
                <h3>{userDetails.phnum}</h3>
            </div>
        </div>
    )
}

export default Accepted