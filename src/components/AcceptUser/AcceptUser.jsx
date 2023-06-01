import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { db } from '../../firebase';

const AcceptUser = ({ storeDetails }) => {
  const [userStore, setUserStore] = useState();
  const userInfoCollectionsRef = collection(db, 'auth-user');

  const [curStore, setCurStore] = useState();
  const storeInfoCollectionsRef = collection(db, 'store');

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
      console.log(storeDetails);
      const storeDoc = doc(db, 'store', storeDetails.id);
      const dataDoc = await getDoc(storeDoc);
      setCurStore(dataDoc.data());
    };

    getStoreData();
  }, [storeDetails.id]);

  const [btnClicked, setBtnClicked] = useState(false);

  const updateAllStores = async (email) => {
    const data = await getDocs(storeInfoCollectionsRef);
    for (var i = 0; i < data.docs.length; i++) {
      const storeDoc = doc(db, 'store', data.docs[i].id);
      const dataDoc = await getDoc(storeDoc);
      if (dataDoc.data().reqUser === email) {
        console.log('Called');
        await updateDoc(storeDoc, { reqUser: '' });
        break;
      }
    }
  };

  const acceptUser = async () => {
    const storeDoc = doc(db, 'auth-user', userStore.id);
    await updateDoc(storeDoc, { accept: true, reqStore: storeDetails.phnum });
    updateAllStores(userStore.email);
    setBtnClicked(true);
  };

  const rejectUser = async () => {
    const storeDoc = doc(db, 'auth-user', userStore.id);
    await updateDoc(storeDoc, { accept: false });
    setBtnClicked(true);
  };

  return (
    <div id="accept" style={{ display: curStore && curStore.reqUser ? 'block' : 'none' }}>
      {!btnClicked && curStore && curStore.reqUser && (
        <>
          <h3>{curStore.reqUser}</h3>
          <Button temp={curStore.reqUser} id="btn" onClick={acceptUser} variant="success">
            Accept
          </Button>
          <Button id="btn" onClick={rejectUser} variant="danger">
            Reject
          </Button>
        </>
      )}
    </div>
  );
};

export default AcceptUser;
