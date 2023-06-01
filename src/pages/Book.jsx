import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Map from '../components/Map/Map';
import Controls from '../components/Controls/Controls';
import useGeoLocation from '../api/useGeoLocation';
import { Link, useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { Button } from 'react-bootstrap';

const Book = () => {
    const location = useGeoLocation();
    const [locationChanged, setLocationChanged] = useState(false);
    const [avail, setAvail] = useState(false);
    const [storePh, setStorePh] = useState();
    const { curUser } = useAuth();

    useEffect(() => {
        setLocationChanged(true);
    }, [location]);

    const [userStore, setUserStore] = useState();
    const userInfoCollectionsRef = collection(db, 'auth-user');

    useEffect(() => {
        const getUserData = async () => {
            const data = await getDocs(userInfoCollectionsRef);
            for (var i = 0; i < data.docs.length; i++) {
                const storeDoc = doc(db, 'auth-user', data.docs[i].id);
                const dataDoc = await getDoc(storeDoc);
                if (dataDoc.data().email === curUser.email) {
                    setUserStore({ ...dataDoc.data(), id: dataDoc.id });
                    break;
                }
            }
        };

        getUserData();

        const timer = setInterval(async () => {
            console.log('Timer');
            const data = await getDocs(userInfoCollectionsRef);
            for (var i = 0; i < data.docs.length; i++) {
                const storeDoc = doc(db, 'auth-user', data.docs[i].id);
                const dataDoc = await getDoc(storeDoc);
                if (dataDoc.data().email === curUser.email) {
                    setUserStore({ ...dataDoc.data(), id: dataDoc.id });
                    setAvail(dataDoc.data().accept);
                    setStorePh(dataDoc.data().reqStore);
                    if (dataDoc.data().accept) {
                        console.log("accepted");
                        clearInterval(timer);
                        break;
                    }
                }
            }
        }, 1000);

        setTimeout(() => {
            clearInterval(timer);
        }, 15000);

        return () => clearInterval(timer);
    }, []);

    const { state } = useLocation();
    const userLoc = state.userLocation;
    const locations = state.locations;

    useEffect(() => {
        const updateUser = async (locations) => {
            for (var i = 0; i < locations.length; i++) {
                var userDet = curUser.email;
                const storeDoc = doc(db, 'store', locations[i].id);
                await updateDoc(storeDoc, { reqUser: userDet });
            }
        };

        updateUser(locations);
    }, []);

    const cancelBooking = async () => {
        const storeDoc = doc(db, 'auth-user', userStore.id);
        await updateDoc(storeDoc, { accept: false });
        setAvail(false);
    }

    return (
        <div className="flex flex-col h-screen md:flex-row">
            <Map location={location} locationChanged={locationChanged} />
            <div className="flex-1">
                <Header search={false} />
                <div className="mt-8 flex items-center justify-center">
                    {avail ? (
                        <div className='flex-col'>
                            <h3>Store booked! </h3>
                            <h3>Contact details: {storePh}</h3>
                            <Link to='/home'><Button onClick={cancelBooking}>Cancel</Button></Link>
                        </div>
                    ) : (
                        <h3>Waiting for stores to accept</h3>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Book;