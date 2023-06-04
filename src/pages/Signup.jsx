import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const usernameRef = useRef();
    const phnumRef = useRef();
    const { signUp } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const userInfoCollectionsRef = collection(db, "auth-user");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Password do not match!")
        }

        try {
            setError('');
            setLoading(true);
            await signUp(emailRef.current.value, passwordRef.current.value)
            navigate('/home')
        }
        catch (err) {
            console.log(err);
            setError("Failed to create an account")
        }

        await addDoc(userInfoCollectionsRef, { email: emailRef.current.value, username: usernameRef.current.value, phnum: phnumRef.current.value});
        alert('Data inserted!');

        setLoading(false);
    }

    return (
        <>
            <Container className='flex flex-col justify-center items-center min-h-screen'>
                <Card className='w-96'>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Sign Up</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
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
                                <Form.Label>Full name</Form.Label>
                                <Form.Control type='text' ref={usernameRef} required></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control type='text' ref={phnumRef} required></Form.Control>
                            </Form.Group>
                            <Button disabled={loading} className='w-100 mt-4' type='submit'>Sign Up</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    Already have an account? <Link to='/home'>Log In</Link>
                </div>
            </Container>
        </>
    )
}

export default Signup