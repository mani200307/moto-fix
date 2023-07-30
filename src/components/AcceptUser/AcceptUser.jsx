import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { db } from '../../firebase';

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
        {!btnClicked && curStore && curStore.reqUser && userDetails && (
          <div className='bg-base-200 w-fit rounded-lg p-3 flex flex-col gap-2'>
            <div className='flex flex-col items-center'>
              <h2>{userDetails.username}</h2>
              <h3>{userDetails.phnum}</h3>
            </div>
            <div className='flex gap-3'>
              <Button temp={curStore.reqUser} id="btn" onClick={acceptUser} variant="success">
                Accept
              </Button>
              <Button id="btn" onClick={rejectUser} variant="danger">
                Reject
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcceptUser;
