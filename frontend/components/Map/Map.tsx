import React from "react"
import { useRouter } from "next/router"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import useGetOfferedService from "../../hooks/useGetOfferedService"

const mapContainerStyle = {
  height: "70vh",
}

export default function Map() {
  const router = useRouter()
  const { data } = useGetOfferedService(router.query.id as string)
  const [markers, setMarkers] = React.useState([{}])

  const onMapClick = React.useCallback((event: any) => {
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ])
  }, [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GG_API_KEY!,
  })
  const center = {
    lat: data!.paperMaker.user.lat!,
    lng: data!.paperMaker.user.long!,
  }

  console.log(data)
  if (!isLoaded)
    return <div className="text-center mt-5 text-3xl">Loading ...</div>
  return (
    <div className="mt-10 border-4 border-orange-300 hover:border-indigo-400">
      <div>
        <GoogleMap
          zoom={15}
          center={center}
          mapContainerStyle={mapContainerStyle}
          mapContainerClassName="map-container"
          options={{
            disableDefaultUI: true,
            zoomControl: true,
          }}
          onClick={onMapClick}
        >
          {markers.map((marker: any) => (
            <Marker
              key={`${marker.lat}-${marker.lng}`}
              position={{ lat: marker.lat, lng: marker.lng }}
            />
          ))}
          {markers.map((marker: any) => (
            <Marker key={`${marker.lat}-${marker.lng}`} position={center} />
          ))}
        </GoogleMap>
      </div>
    </div>
  )
}
