import React, { useEffect, useState } from 'react';
import StoreHeader from '../components/Header/StoreHeader';
import { collection, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import AcceptUser from '../components/AcceptUser/AcceptUser';

const StoreHome = () => {
  const [curStore, setCurStore] = useState();
  const storeInfoCollectionsRef = collection(db, 'store');
  const { curUser } = useAuth();

  useEffect(() => {
    const getStoreInfo = async () => {
      const data = await getDocs(storeInfoCollectionsRef);
      for (var i = 0; i < data.docs.length; i++) {
        const storeDoc = doc(db, 'store', data.docs[i].id);
        const dataDoc = await getDoc(storeDoc);
        if (dataDoc.data().email === curUser.email) {
          setCurStore({...dataDoc.data(), id: dataDoc.id});
          break;
        }
      }
    }
    getStoreInfo();
  }, []);

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

  return (
    <div className="flex flex-col h-screen md:flex-row">
      <div className="flex-1">
        <StoreHeader search={false} />
        {curStore && curStore.reqUser && <AcceptUser storeDetails={curStore} />}
      </div>
    </div>
  );
};

export default StoreHome;