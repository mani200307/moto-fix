import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const StoreLogin = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value)
            console.log("logged in");
            navigate('/store');
        }
        catch (err) {
            console.log(err);
            setError("Failed to log in")
        }
        setLoading(false);
    }

    return (
        <>
            <Container className='flex flex-col justify-center items-center min-h-screen'>
                <Card className='w-96'>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Log In</h2>
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
                            <Button disabled={loading} className='w-100 mt-4' type='submit'>Log In</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    New user ? <Link to='/store/signup'>Sign Up</Link>
                </div>
            </Container>
        </>
    )
}

export default StoreLogin