import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';

const AcceptUser = ({ storeDetails }) => {
  const [userStore, setUserStore] = useState();
  const [userDetails, setUserDetails] = useState(null);
  const userInfoCollectionsRef = collection(db, 'auth-user');
  const [curStore, setCurStore] = useState();
  const storeInfoCollectionsRef = collection(db, 'store');
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      const data = await getDocs(userInfoCollectionsRef);
      for (var i = 0; i < data.docs.length; i++) {
        const storeDoc = doc(db, 'auth-user', data.docs[i].id);
        const dataDoc = await getDoc(storeDoc);
        if (dataDoc.data().email === storeDetails.reqUser) {
          setUserStore({ ...dataDoc.data(), id: dataDoc.id });
          break;
        }
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    const getStoreData = async () => {
      const storeDoc = doc(db, 'store', storeDetails.id);
      const dataDoc = await getDoc(storeDoc);
      setCurStore(dataDoc.data());
    };

    getStoreData();
  }, [storeDetails.id]);

  useEffect(() => {
    const getStoreData = async () => {
      const storeDoc = doc(db, 'store', storeDetails.id);
      const dataDoc = await getDoc(storeDoc);
      setCurStore(dataDoc.data());

      if (dataDoc.data().reqUser) {
        const querySnapshot = await getDocs(collection(db, 'auth-user'));
        const userData = querySnapshot.docs.find((doc) => doc.data().email === dataDoc.data().reqUser);
        if (userData) {
          setUserDetails(userData.data());
        }
      }
    };

    getStoreData();
  }, [storeDetails.id, curStore?.reqUser]);

  const [btnClicked, setBtnClicked] = useState(false);

  const updateAllStores = async (email) => {
    const data = await getDocs(storeInfoCollectionsRef);
    for (var i = 0; i < data.docs.length; i++) {
      const storeDoc = doc(db, 'store', data.docs[i].id);
      const dataDoc = await getDoc(storeDoc);
      if (dataDoc.data().reqUser === email) {
        await updateDoc(storeDoc, { reqUser: '' });
      }
    }
  };

  const acceptUser = async () => {
    const storeDoc = doc(db, 'auth-user', userStore.id);
    await updateDoc(storeDoc, { accept: true, reqStore: storeDetails.email });
    await updateAllStores(userStore.email);
    const thisStore = doc(db, 'store', storeDetails.id);
    await updateDoc(thisStore, { accept: true });
    setBtnClicked(true);
    setAccepted(true);
  };

  const rejectUser = async () => {
    const storeDoc = doc(db, 'auth-user', userStore.id);
    await updateDoc(storeDoc, { accept: false });
    setBtnClicked(true);
    setAccepted(false);
  };

  return (
    <div>
      <div id="accept" className='flex justify-center items-center flex-col ml-5'>
        {!btnClicked && curStore && curStore.reqUser && (
          <div className='bg-base-200 w-fit rounded-lg p-2 flex gap-2'>
            <h3>{curStore.reqUser}</h3>
            <Button temp={curStore.reqUser} id="btn" onClick={acceptUser} variant="success">
              Accept
            </Button>
            <Button id="btn" onClick={rejectUser} variant="danger">
              Reject
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcceptUser;
