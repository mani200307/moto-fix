import { useEffect, useState } from 'react';

const useGeoLocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: 10.0, lng: 10.0 },
    });

    const onSuccess = (location) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude
            }
        })
    }

    const onError = (error) => {
        setLocation({
            loaded: true,
            error
        })
    }

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported"
            })
            console.log("Location not supported");
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, [])

    return location;
};

export default useGeoLocation;