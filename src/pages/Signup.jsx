import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signUp } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
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
                            <Button disabled={loading} className='w-100 mt-4' type='submit'>Sign Up</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    Already have an account? <Link to='/'>Log In</Link>
                </div>
            </Container>
        </>
    )
}

export default Signup