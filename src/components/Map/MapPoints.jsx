import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import L from 'leaflet';

const MapPoints = ({ locations, userCoord }) => {
    const mapRef = useRef();
    const [mapKey, setMapKey] = useState(0);

    const markerIcon = new L.Icon({
        iconUrl: require('../../assets/marker.png'),
        iconSize: [25, 35],
        iconAnchor: [17, 46],
        popupAnchor: [0, -46]
    });

    const curMarkerIcon = new L.Icon({
        iconUrl: require('../../assets/green-marker.png'),
        iconSize: [25, 35],
        iconAnchor: [17, 46],
        popupAnchor: [0, -46]
    });


    useEffect(() => {
        setMapKey(mapKey + 1); // Update the mapKey to re-render the map when locations change
    }, [locations]);

    return (
        <MapContainer className="w-full flex-1" center={[userCoord.lat, userCoord.lng]} zoom={10} key={mapKey} ref={mapRef}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((location, index) => (
                <Marker
                    key={index}
                    icon={markerIcon}
                    position={[location.lat, location.lng]}
                ></Marker>
            ))}
            <Marker
                icon={curMarkerIcon}
                position={[userCoord.lat, userCoord.lng]}
            ></Marker>
        </MapContainer>
    );
};

export default MapPoints;
