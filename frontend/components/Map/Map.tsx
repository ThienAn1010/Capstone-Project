import React from "react";
import { GoogleMap, useLoadScript} from "@react-google-maps/api";

export default function Map() {
    const {isLoaded} = useLoadScript({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GG_API_KEY!,
    });

    if (!isLoaded) return <div className="text-center mt-5 text-3xl">Loading ...</div>;

    return (
        <div className="mt-10 border-4 border-orange-300 hover:border-indigo-400">
            <GgMap />
        </div>
    )
}

const mapContainerStyle = {
    height: "65vh",
}

const center = { lat: 10.823099, lng: 106.629662 }

function GgMap() {
    // const [markers, setMarkers] = React.useState([]);
    return(
        <GoogleMap
        zoom={15}
        center={center}
        mapContainerStyle={mapContainerStyle}
        // onClick={(event) => {
        //     setMarkers((current) => [
        //         ...current,
        //         {
        //             lat: event.latLng.lat(),
        //             lng: event.latLng.lng(),
        //         },
        //     ])
        // }}
        >
        </GoogleMap>
    )
}