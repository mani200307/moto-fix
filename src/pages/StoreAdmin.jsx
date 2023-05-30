import { addDoc, collection } from 'firebase/firestore';
import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const StoreAdmin = () => {
    const nameRef = useRef();
    const latRef = useRef();
    const lngRef = useRef();
    const typeRef = useRef();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const storeInfoCollectionsRef = collection(db, "store");
    const navigate = useNavigate();

    const addStore = async () => {
        await addDoc(storeInfoCollectionsRef, { name: nameRef.current.value, type: typeRef.current.value, lat: parseFloat(latRef.current.value), lng: parseFloat(lngRef.current.value) });
        alert('Data inserted!');
        navigate('/');
    }

    return (
        <Container className='flex flex-col justify-center items-center min-h-screen'>
            <Card className='w-96'>
                <Card.Body>
                    <h2 className='text-center mb-4'>Store registration</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form>
                        <Form.Group id=''>
                            <Form.Label>Store Name</Form.Label>
                            <Form.Control type='text' ref={nameRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id=''>
                            <Form.Label>Type</Form.Label>
                            <Form.Select ref={typeRef} aria-label="Default select example">
                                <option value="bike">Bike</option>
                                <option value="car">Car</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control type='number' ref={latRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control type='number' ref={lngRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className='w-100 mt-4' onClick={addStore}>Register</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default StoreAdmin