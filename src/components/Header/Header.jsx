import React from 'react'
import 'tailwindcss/tailwind.css';

const Header = () => {
    return (
        <div className=''>
            <div className='flex justify-between items-center m-10 mb-5'>
                <div className='text-3xl'>MotoFix</div>
                <div className='text-xl'>User</div>
            </div>
            <div className='mx-10 my-2'>
                {/* <input type='text' className='bg-gray-100 w-full rounded-xl p-2'/> */}
            </div>
        </div>
    )
}

export default Header