import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Map from '../components/Map/Map';
import Controls from '../components/Controls/Controls';
import useGeoLocation from '../api/useGeoLocation';

const Home = () => {
  const location = useGeoLocation();
  const [locationChanged, setLocationChanged] = useState(false);

  useEffect(() => {
    setLocationChanged(true);
  }, [location]);

  return (
    <div className="flex flex-col h-screen md:flex-row">
      <Map location={location} locationChanged={locationChanged} />
      <div className="flex-1 flex flex-col">
        <Header search={false} />
        <Controls location={location} locationChanged={locationChanged} />
        <div className="flex-1"></div>
        <div className="flex flex-col mb-5 justify-end items-center">
          <h1 className="text-xl">Book your store</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
