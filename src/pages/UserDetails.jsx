import React from 'react'
import { useLocation } from 'react-router-dom'

const UserDetails = () => {

    const loc = useLocation();
    const userDetails = loc.state.userDetails;

    console.log(userDetails);

    return (
    <div>UserDetails</div>
  )
}

export default UserDetails