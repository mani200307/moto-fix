import React, { useEffect, useState } from 'react';
import StoreHeader from '../components/Header/StoreHeader';
import { collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import AcceptUser from '../components/AcceptUser/AcceptUser';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCheckAvail } from '../contexts/store';

const StoreHome = () => {
  const [curStore, setCurStore] = useState();
  const [user, setUser] = useState();
  const storeInfoCollectionsRef = collection(db, 'store');
  const userInfoCollectionsRef = collection(db, 'auth-user');
  const { curUser } = useAuth();
  const { avail, setAvail } = useCheckAvail();

  console.log(avail);

  useEffect(() => {
    const getStoreInfo = async () => {
      const data = await getDocs(storeInfoCollectionsRef);
      for (var i = 0; i < data.docs.length; i++) {
        const storeDoc = doc(db, 'store', data.docs[i].id);
        const dataDoc = await getDoc(storeDoc);
        if (dataDoc.data().email === curUser.email) {
          setCurStore({ ...dataDoc.data(), id: dataDoc.id });
          break;
        }
      }
    }
    getStoreInfo();
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      const data = await getDocs(userInfoCollectionsRef);
      for (var i = 0; i < data.docs.length; i++) {
        const userDoc = doc(db, 'auth-user', data.docs[i].id);
        const dataDoc = await getDoc(userDoc);
        if (dataDoc.data().reqStore === curUser.email) {
          setUser({ ...dataDoc.data(), id: dataDoc.id });
          setAvail(true);
          break;
        }
      }
    }
    getUserInfo();
  }, [avail]);

  useEffect(() => {
    const unsubscribe = onSnapshot(storeInfoCollectionsRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'modified') {
          const data = change.doc.data();
          if (data.email === curUser.email) {
            setCurStore({ ...data, id: change.doc.id });
          }
        }
      });
    });

    return () => unsubscribe();
  }, [curUser.email]);

  const cancelBooking = async () => {
    const storeDoc = doc(db, 'auth-user', user.id);
    await updateDoc(storeDoc, { accept: false });
    await updateDoc(storeDoc, { reqStore: '' });
    const data = await getDocs(storeInfoCollectionsRef);
    for (var i = 0; i < data.docs.length; i++) {
      const storeDoc = doc(db, 'store', data.docs[i].id);
      await updateDoc(storeDoc, { reqUser: '', accept: false });
    }
    setUser('');
    setAvail(false);
  }

  console.log(user);

  return (
    <div className="flex flex-col h-screen md:flex-row">
      <div className="flex-1">
        <StoreHeader search={false} />
        {curStore && curStore.reqUser && <AcceptUser storeDetails={curStore} />}
        <div className='flex flex-col items-center justify-center'>
          {user && avail && (
            <>
              <h1 className='text-xl mb-3'>Active Bookings</h1>
              <div className='bg-base-200 mb-3 flex flex-col justify-center items-center w-fit rounded-lg p-4 gap-2'>
                <h3>{user.username}</h3>
                <h3 className='text-2xl'>{user.phnum}</h3>
              </div>
              <Link to='/store'><Button onClick={cancelBooking}>Cancel / Finish</Button></Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreHome;