import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const StoreSignup = () => {
    const nameRef = useRef();
    const typeRef = useRef();
    const latRef = useRef();
    const lngRef = useRef();
    const emailRef = useRef();
    const usernameRef = useRef();
    const phnumRef = useRef();
    const addrRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const storeInfoCollectionsRef = collection(db, "store");
    const { signUp } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const navigate = useNavigate();

    const [isFormValid, setIsFormValid] = useState(false); // New state to track form validity

    const handleSubmit = async (e) => {

        e.preventDefault();

        const requiredFieldsFilled = (
            emailRef.current.value &&
            passwordRef.current.value &&
            passwordConfirmRef.current.value &&
            nameRef.current.value &&
            typeRef.current.value &&
            usernameRef.current.value &&
            phnumRef.current.value &&
            addrRef.current.value &&
            latRef.current.value &&
            lngRef.current.value
        );

        console.log(requiredFieldsFilled);
        setIsFormValid(requiredFieldsFilled);

        if (!requiredFieldsFilled) {
            setError("Please fill in all the required fields.");
            return;
        }

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Password do not match!")
        }

        try {
            setError('');
            setLoading(true);
            await signUp(emailRef.current.value, passwordRef.current.value);
            await addDoc(storeInfoCollectionsRef, { name: nameRef.current.value, email: emailRef.current.value, type: typeRef.current.value, lat: parseFloat(latRef.current.value), lng: parseFloat(lngRef.current.value), username: usernameRef.current.value, phnum: phnumRef.current.value, address: addrRef.current.value });
            navigate('/store')
        }
        catch (err) {
            console.log(err);
            setError("Failed to create an account")
        }
        setLoading(false);
    }

    const fetchLoc = (e) => {

        e.preventDefault();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    console.log(latitude);
                    console.log(longitude);
                    setLat(latitude);
                    setLng(longitude);
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            console.error("User denied the request for geolocation.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            console.error("Location information is unavailable.");
                            break;
                        case error.TIMEOUT:
                            console.error("The request to get user location timed out.");
                            break;
                        case error.UNKNOWN_ERROR:
                            console.error("An unknown error occurred.");
                            break;
                    }
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }

    return (
        <>
            <Container className='flex flex-col justify-center items-center min-h-screen'>
                <Card className='w-96'>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Store Registration</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <Form>
                            <Form.Group id='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' ref={emailRef} required></Form.Control>
                            </Form.Group>
                            <Form.Group id='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' ref={passwordRef} required></Form.Control>
                            </Form.Group>
                            <Form.Group id='password-confirm'>
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type='password' ref={passwordConfirmRef} required></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Store Name</Form.Label>
                                <Form.Control type='text' ref={nameRef} required></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Type</Form.Label>
                                <Form.Select ref={typeRef} aria-label="Default select example">
                                    <option value="bike">Bike</option>
                                    <option value="car">Car</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Full name</Form.Label>
                                <Form.Control type='text' ref={usernameRef} required></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control type='text' ref={phnumRef} required></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <Form.Control type='text' ref={addrRef} required></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Latitude</Form.Label>
                                <Form.Control value={lat} disabled={true} type='number' ref={latRef} required></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Longitude</Form.Label>
                                <Form.Control value={lng} disabled={true} type='number' ref={lngRef} required></Form.Control>
                            </Form.Group>
                            <button onClick={fetchLoc} className='bg-gray-500 text-white rounded-md p-2 mt-2'>Fetch current location</button>
                            <Button disabled={loading} className='w-100 mt-4' onClick={handleSubmit}>Register</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    Already have an account? <Link to='/store'>Log In</Link>
                </div>
            </Container>
        </>
    )
}

export default StoreSignup