import 'leaflet/dist/leaflet.css'
import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import L from 'leaflet'

const Map = ({ location, locationChanged }) => {
    const mapRef = useRef();

    const [mapCenter, setMapCenter] = useState([location.coordinates.lat, location.coordinates.lng]);
    const [mapKey, setMapKey] = useState(0);

    const markerIcon = new L.Icon({
        iconUrl: require('../../assets/green-marker.png'),
        iconSize: [25, 35],
        iconAnchor: [17, 46],
        popupAnchor: [0, -46]
    })

    useEffect(() => {
        if (location.loaded) {
            setMapCenter([location.coordinates.lat, location.coordinates.lng]);
            setMapKey(prevKey => prevKey + 1);
        }
    }, [location, locationChanged]);

    return (
        <>
            {
                location.loaded ?
                    <MapContainer className='w-full flex-1' center={mapCenter} zoom={13} key={mapKey} ref={mapRef}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker icon={markerIcon} position={[location.coordinates.lat, location.coordinates.lng]}>
                        </Marker>
                    </MapContainer>
                    : <span className="loading loading-spinner loading-lg"></span>
            }
        </>
    )
}

export default Map;
