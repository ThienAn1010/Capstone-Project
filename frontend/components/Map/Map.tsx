import React, { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";
// import useGetOfferedService from "../../../hooks/useGetOfferedService"


const mapContainerStyle = {
    height: "70vh",
}

export default function Map() {
    const {isLoaded} = useLoadScript({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GG_API_KEY!,
    });
    const center = useMemo(() => ({
        lat: 10.7296,
        lng: 106.6931
    }), []);
    if (!isLoaded) return <div className="text-center mt-5 text-3xl">Loading ...</div>;

    return (
        <div className="mt-10 border-4 border-orange-300 hover:border-indigo-400">
            <div>
                <GoogleMap
                zoom={100}
                center={center}
                mapContainerStyle={mapContainerStyle}
                mapContainerClassName="map-container"
                >
                    <Marker
                    position={center}
                    icon={{
                        url:"../../public/favicon.ico",
                        origin: new window.google.maps.Point(0,0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(30, 30),
                    }}
                    />
                </GoogleMap>
            </div>
        </div>
    )
}