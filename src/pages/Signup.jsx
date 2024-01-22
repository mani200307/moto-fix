import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const Signup = () => {
    const { signUp } = useAuth();
    const userInfoCollectionsRef = collection(db, "auth-user");
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phnum, setPhnum] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signed, setSigned] = useState(false);
    const [errName, setErrName] = useState(' ');
    const [errEmail, setErrEmail] = useState(' ');
    const [errPass, setErrPass] = useState(' ');
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setPhnum('');
    };

    const validateForm = (e) => {
        const { name, value } = e.target;

        if (name === 'name') {
            if (value.trim() === '') {
                setErrName("It shouldn't be empty");
            } else {
                setErrName('');
            }
            setName(value);
        } else if (name === 'email') {
            var atPos = value.indexOf("@");
            var dotPos = value.lastIndexOf(".");
            const valid = atPos > 0 && dotPos > atPos + 1 && dotPos < value.length - 1 && value.trim() !== '';
            if (!valid) {
                setErrEmail("Enter a valid email");
            } else {
                setErrEmail('');
            }
            setEmail(value);
        } else if (name === 'password') {
            const passwordInputValue = value.trim();
            const uppercaseRegEx = /(?=.*?[A-Z])/;
            const lowercaseRegEx = /(?=.*?[a-z])/;
            const digitsRegEx = /(?=.*?[0-9])/;
            const specialCharRegEx = /(?=.*?[#?!@$%^&*-])/;
            const minLengthRegEx = /.{8,}/;

            const passwordLength = passwordInputValue.length;
            const uppercasePassword = uppercaseRegEx.test(passwordInputValue);
            const lowercasePassword = lowercaseRegEx.test(passwordInputValue);
            const digitsPassword = digitsRegEx.test(passwordInputValue);
            const specialCharPassword = specialCharRegEx.test(passwordInputValue);
            const minLengthPassword = minLengthRegEx.test(passwordInputValue);

            let errMsg = '';

            if (passwordLength === 0) {
                errMsg = 'Password is empty';
            } else if (!uppercasePassword) {
                errMsg = 'At least one Uppercase';
            } else if (!lowercasePassword) {
                errMsg = 'At least one Lowercase';
            } else if (!digitsPassword) {
                errMsg = 'At least one digit';
            } else if (!specialCharPassword) {
                errMsg = 'At least one Special Characters';
            } else if (!minLengthPassword) {
                errMsg = 'At least minimum 8 characters';
            } else {
                errMsg = '';
            }

            setErrPass(errMsg);
            setPassword(value);
        } else {
            setPhnum(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSigned(false);

        if (errEmail === '' && errName === '' && errPass === '') {
            try {
                setLoading(true);
                await signUp(email, password)
                navigate('/home')
            }
            catch (err) {
                console.log(err);
            }

            await addDoc(userInfoCollectionsRef, { email: email, username: name, phnum: phnum });
            
            setSigned(true);
            resetForm();
            setLoading(false);
        }
    }

    return (
        <div className='flex flex-col justify-center h-screen items-center'>
            <div className="bg-base-100 flex flex-col justify-center items-center gap-2 shadow-lg rounded-lg p-2 h-fit w-96">
                <h1 className="text-2xl mt-8">Sign Up</h1>
                {signed && (
                    <div className="alert alert-success w-fit">
                        <span>Registered Successfully</span>
                    </div>
                )}
                <div className='flex flex-col gap-2'>
                    <label className="label">
                        <span className="label-text text-lg">Name</span>
                    </label>
                    <div className="flex flex-col">
                        <input name="name" placeholder="Enter your name" type="text" value={name} onChange={validateForm} className="input input-bordered max-w-xs w-60" />
                        {errName !== '' && <span className="text-sm text-red-500 max-w-xs mt-2">{errName}</span>}
                    </div>
                    <label className="label">
                        <span className="label-text text-lg">Email</span>
                    </label>
                    <div className="flex flex-col">
                        <input name="email" placeholder="Enter your email" type="email" value={email} onChange={validateForm} className="input input-bordered max-w-xs w-60" />
                        {errEmail !== '' && <span className="text-sm text-red-500 max-w-xs mt-2">{errEmail}</span>}
                    </div>
                    <label className="label">
                        <span className="label-text text-lg">Mobile number</span>
                    </label>
                    <div className="flex flex-col">
                        <input name="phnum" placeholder="Enter your mobile number" type="text" value={phnum} onChange={validateForm} className="input input-bordered max-w-xs w-60" />
                    </div>
                    <div className="flex flex-col">
                        <label className="label">
                            <span className="label-text text-lg">Password</span>
                        </label>
                        <input type="password" placeholder="Set a strong password" name="password" onChange={validateForm} value={password} className="input input-bordered max-w-xs w-60" />
                        {errPass !== '' && <span className="text-sm text-red-500 max-w-xs mt-2">{errPass}</span>}
                    </div>
                </div>
                {loading ? <span className="loading loading-spinner loading-md"></span> :
                    <button onClick={handleSubmit} className="mt-3 btn btn-primary w-fit">
                        Register
                    </button>
                }
                <h1 className='text-sm'>
                    Already registered? <a href="/login" className='text-sm text-blue-500'>Sign in</a>
                </h1>
            </div>
        </div>
    )
}

export default Signup