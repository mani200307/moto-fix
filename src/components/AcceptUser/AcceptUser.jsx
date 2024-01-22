import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import { useCheckAvail } from '../../contexts/store';

const AcceptUser = ({ storeDetails }) => {
  const [userStore, setUserStore] = useState();
  const [userDetails, setUserDetails] = useState(null);
  const userInfoCollectionsRef = collection(db, 'auth-user');
  const [curStore, setCurStore] = useState();
  const storeInfoCollectionsRef = collection(db, 'store');
  const [accepted, setAccepted] = useState(false);
  const { avail, setAvail } = useCheckAvail();

  console.log(userDetails);
  console.log('Accept', avail);

  console.log(curStore);

  useEffect(() => {
    const getUserData = async () => {
      const data = await getDocs(userInfoCollectionsRef);
      for (var i = 0; i < data.docs.length; i++) {
        const storeDoc = doc(db, 'auth-user', data.docs[i].id);
        const dataDoc = await getDoc(storeDoc);
        if (dataDoc.data().email === storeDetails.reqUser) {
          setUserStore({ ...dataDoc.data(), id: dataDoc.id });
          console.log({ ...dataDoc.data(), id: dataDoc.id });
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
    setAvail(true);
  };

  const rejectUser = async () => {
    const storeDoc = doc(db, 'auth-user', userStore.id);
    await updateDoc(storeDoc, { accept: false });
    setBtnClicked(true);
    setAccepted(false);
    setAvail(false);
  };

  return (
    <div>
      <div id="accept" className='flex justify-center items-center flex-col ml-5'>
<<<<<<< HEAD
        {curStore && curStore.reqUser && !btnClicked && (
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{curStore.reqUser}</h2>
              <p>{}</p>
              <div className="card-actions justify-end">
                <Link to='/store/accept' state={{ 'userDetails': userStore }}>
                  <Button temp={curStore.reqUser} id="btn" onClick={acceptUser} variant="success">
                    Accept
                  </Button>
                </Link>
                <Button id="btn" onClick={rejectUser} variant="danger">
                  Reject
                </Button>
              </div>
=======
        {!btnClicked && curStore && curStore.reqUser && (
          <div className='bg-base-200 flex flex-col items-center justify-center w-fit rounded-lg p-4 gap-2'>
            <h3>{userDetails?.username}</h3>
            <h3>{userDetails?.phnum}</h3>
            <div className='flex gap-3'>
              <Button temp={curStore.reqUser} id="btn" onClick={acceptUser} variant="success">
                Accept
              </Button>
              <Button id="btn" onClick={rejectUser} variant="danger">
                Reject
              </Button>
>>>>>>> f10d5202558b7578db739eefeca6f9feeea83296
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcceptUser;
