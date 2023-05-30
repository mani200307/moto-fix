import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import MapPoints from '../components/Map/MapPoints';
import Header from '../components/Header/Header';
import Controls from '../components/Controls/Controls';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Search = () => {
  const { state } = useLocation();
  const userCoords = state.location.coordinates;

  const findDist = (a1, a2) => {
    const x1 = a1.lat, y1 = a1.lng;
    const x2 = a2.lat, y2 = a2.lng;

    return (Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)))
  }

  const getNearestStores = (locations, userCoords) => {
    var loc = [];
    for (var i = 0; i < locations.length; i++) {
      if(findDist(locations[i], userCoords) < 1.5)
        loc.push(locations[i]);
    }
    return loc;
  }

  const [storeInfo, setStoreInfo] = useState([]);
  const storeInfoCollectionsRef = collection(db, "store");

  var locations = storeInfo.map((info) => { return { lat: info.lat, lng: info.lng } })
  locations = getNearestStores(locations, userCoords);

  useEffect(() => {
    const getStoreInfo = async () => {
      const data = await getDocs(storeInfoCollectionsRef);
      setStoreInfo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    getStoreInfo();
  }, [])

  return (
    <div className="flex flex-col h-screen md:flex-row">
      <MapPoints locations={locations} userCoord={userCoords} />
      <div className="flex-1">
        <Header search={true} />
      </div>
    </div>
  )
}

export default Search