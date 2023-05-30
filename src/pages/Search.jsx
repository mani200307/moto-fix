import React from 'react'
import { useLocation } from 'react-router-dom'
import MapPoints from '../components/Map/MapPoints';
import Header from '../components/Header/Header';
import Controls from '../components/Controls/Controls';

const Search = () => {
  const { state } = useLocation();
  const userCoords = state.location.coordinates;

  const findDist = (a1, a2) => {
    const x1 = a1[0], y1 = a1[1];
    const x2 = a2[0], y2 = a2[1];

    return (Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)))
  }

  // console.log(userCoords);

  const pts = [[10, 20], [13, 23], [45, 23]]

  console.log(findDist(pts[0], pts[1]));

  const locations = [
    { lat: userCoords.lat+0.1, lng: userCoords.lng+0.1 },
    { lat: userCoords.lat+0.2, lng: userCoords.lng-0.2 },
    { lat: userCoords.lat+0.3, lng: userCoords.lng+0.3 },
  ];

  return (
    <div className="flex flex-col h-screen md:flex-row">
      <MapPoints locations={locations} userCoord={userCoords}/>
      <div className="flex-1">
        <Header />
      </div>
    </div>
  )
}

export default Search