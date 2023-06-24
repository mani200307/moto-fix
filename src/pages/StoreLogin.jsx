import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const StoreLogin = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [signed, setSigned] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await login(email, password)
            setSigned(true);
            navigate('/store');
        }
        catch (err) {
            console.log(err);
            setError("Incorrect username or password")
        }
        setLoading(false);
    }

    return (
        <div className='flex flex-col justify-center h-screen items-center'>
            <div className="bg-base-100 flex-col justify-center items-center gap-2 shadow-lg rounded-lg p-3 w-fit">
                <h1 className='text-2xl mt-8 text-center'>Sign in</h1>
                <div className='flex flex-col gap-2'>
                    {
                        error &&
                        <div className="alert alert-error w-fit">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Incorrect email or password</span>
                        </div>
                    }
                    {
                        signed &&
                        <div className="alert alert-success w-fit">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Logged in</span>
                        </div>
                    }
                    <label className="label">
                        <span className="label-text text-lg">Email</span>
                    </label>
                    <input name='email' placeholder='Enter email' type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="input input-bordered max-w-xs w-60" />
                    <label className="label">
                        <span className="label-text text-lg">Password</span>
                    </label>
                    <input type="password" placeholder='Enter password' name="password" onChange={(e) => setPassword(e.target.value)} value={password} className="input input-bordered max-w-xs w-60" />
                </div>
                <div className='flex flex-col justify-center items-center gap-3'>
                    {loading ? <span className="loading loading-spinner loading-md"></span> : <button onClick={handleSubmit} className="mt-3 btn btn-primary w-fit">Sign in</button>}
                    <h1 className='text-sm'>New User? <Link href='/signup' className='text-sm text-blue-500'>Sign up</Link></h1>
                </div>
            </div>
        </div>
    )
}

export default StoreLogin