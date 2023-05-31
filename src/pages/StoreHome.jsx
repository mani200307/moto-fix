import React, { useEffect, useState } from 'react'
import StoreHeader from '../components/Header/StoreHeader';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import AcceptUser from '../components/AcceptUser/AcceptUser';

const StoreHome = () => {

  const [curStore, setCurStore] = useState();
  const storeInfoCollectionsRef = collection(db, "store");
  const { curUser } = useAuth();

  useEffect(() => {
    const getStoreInfo = async () => {
      const data = await getDocs(storeInfoCollectionsRef);
      for (var i = 0; i < data.docs.length; i++) {
        const storeDoc = doc(db, 'store', data.docs[i].id);
        const dataDoc = await getDoc(storeDoc);
        if (dataDoc.data().email === curUser.email) {
          setCurStore(dataDoc.data());
          break;
        }
      }
    }
    getStoreInfo();
  }, []);

  console.log(curStore);

  return (
    <div className="flex flex-col h-screen md:flex-row">
      <div className="flex-1">
        <StoreHeader search={false} />
        {curStore && curStore.reqUser && (<AcceptUser storeDetails={curStore} />)}
      </div>
    </div>
  )
}

export default StoreHome