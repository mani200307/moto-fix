import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header';
import Map from '../components/Map/Map';
import Controls from '../components/Controls/Controls'
import useGeoLocation from '../api/useGeoLocation';
import { useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

const Book = () => {

    const location = useGeoLocation();
    const [locationChanged, setLocationChanged] = useState(false);
    const [avail, setAvail] = useState(false);
    const [storePh, setStorePh] = useState();
    const { curUser } = useAuth()

    useEffect(() => {
        setLocationChanged(true);
    }, [location]);

    const [userStore, setUserStore] = useState();
    const userInfoCollectionsRef = collection(db, "auth-user");

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
            console.log("Called");
            console.log(userStore);
        }

        getUserData();

        const timer = setTimeout(() => {
            console.log("Timer");
            console.log(userStore);

            const refr = async () => {
                const data = await getDocs(userInfoCollectionsRef);
                for (var i = 0; i < data.docs.length; i++) {
                    const storeDoc = doc(db, 'auth-user', data.docs[i].id);
                    const dataDoc = await getDoc(storeDoc);
                    if (dataDoc.data().email === curUser.email) {
                        setUserStore({ ...dataDoc.data(), id: dataDoc.id });
                        setAvail(dataDoc.data().accept);
                        setStorePh(dataDoc.data().reqStore)
                        break;
                    }
                }
            }

            refr();

        }, 15000);
        return () => clearTimeout(timer);

    }, [])

    const { state } = useLocation();
    const userLoc = state.userLocation;
    const locations = state.locations;

    useEffect(() => {

        const updateUser = async (locations) => {

            for (var i = 0; i < locations.length; i++) {
                var userDet = curUser.email;
                const storeDoc = doc(db, 'store', locations[i].id);
                await updateDoc(storeDoc, { 'reqUser': userDet });
            }
        }

        updateUser(locations);
    }, [])

    return (
        <div className="flex flex-col h-screen md:flex-row">
            <Map location={location} locationChanged={locationChanged} />
            <div className="flex-1">
                <Header search={false} />
                <div className='mt-8 flex items-center justify-center'>
                    {avail ? <h3>Store booked! Contact details : {storePh} </h3> : <h3>Waiting for stores to accept</h3>}
                </div>
            </div>
        </div>
    )
}

export default Book