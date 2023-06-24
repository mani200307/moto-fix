import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MapPoints from '../components/Map/MapPoints';
import Header from '../components/Header/Header';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Search = () => {
  const { state } = useLocation();
  const userCoords = state.location.coordinates;
  const type = state.type;
  const [storeInfo, setStoreInfo] = useState([]);
  const storeInfoCollectionsRef = collection(db, "store");
  var avail = false;

  const findDist = (a1, a2) => {
    const x1 = a1.lat, y1 = a1.lng;
    const x2 = a2.lat, y2 = a2.lng;

    return (Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)))
  }

  const getNearestStores = (locations, userCoords) => {
    var loc = [];
    for (var i = 0; i < locations.length; i++) {
      if (locations[i].type !== type)
        continue;
      if (findDist(locations[i], userCoords) < 5) {
        avail = true;
        loc.push(locations[i]);
      }
    }
    return loc;
  }

  var locations = storeInfo.map((info) => { return { lat: info.lat, lng: info.lng, type: info.type, email: info.email, id: info.id } })
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
      <div className="flex-1 flex flex-col">
        <Header search={true} avail={avail} />
        <div className='mt-5 flex items-center justify-center'>
          {avail ? <h3>Great, Store available</h3> : <h3>Oops, No available stores</h3>}
        </div>
        {avail && (
          <div className='m-12 mt-3 flex items-center justify-center my-2'>
            <Link to='/book' state={{ userLocation: userCoords, locations: locations }}><button type="button" className="btn btn-success">Book Now!</button></Link>
          </div>
        )}
        <div className='flex-1'></div>
        <div className='flex flex-col mb-5 justify-end items-center'>
          <Link to='/home' className='bg-base-300 rounded-lg'><button className='btn px-4'>Back</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Search