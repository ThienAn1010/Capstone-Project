import React from "react"
import { useRouter } from "next/router"
import { GoogleMap, useLoadScript} from "@react-google-maps/api"
import useGetOfferedService from "../../hooks/useGetOfferedService"
import {MarkerF} from '@react-google-maps/api'
const mapContainerStyle = {
  height: "70vh",
}

export default function Map() {
  const router = useRouter()
  const { data } = useGetOfferedService(router.query.id as string)
  const [markers] = React.useState([{}])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GG_API_KEY!,
  })
  const center = {
    lat: data!.paperMaker.user.lat!,
    lng: data!.paperMaker.user.long!,
  }
  const onLoad = (marker: any) => {
    console.log('marker: ', marker)
  }
  console.log(data)
  if (!isLoaded)
    return <div className="text-center mt-5 text-3xl">Loading ...</div>
  return (
    <div className="mt-10 border-4 border-orange-300 hover:border-indigo-400">
      <div>
        <GoogleMap
            zoom={20}
            center={center}
            mapContainerStyle={mapContainerStyle}
            mapContainerClassName="map-container"
            options={{
                disableDefaultUI: true,
                zoomControl: true,
                fullscreenControl: true
            }}
            onLoad={onLoad}
        >
            {markers.map((marker: any) => (
                <MarkerF
                key={`${marker.lat}-${marker.lng}`}
                position={center}
                />
            ))}
        </GoogleMap>
      </div>
    </div>
  )
}
