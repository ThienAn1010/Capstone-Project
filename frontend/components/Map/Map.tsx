import React from "react"
import { useRouter } from "next/router"
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF} from "@react-google-maps/api"
import useGetOfferedService from "../../hooks/useGetOfferedService"
const mapContainerStyle = {
  height: "70vh",
}

export default function Map() {
  const router = useRouter()
  const { data } = useGetOfferedService(router.query.id as string)
  const [markers] = React.useState([{}])
  const [selected, setSelected] = React.useState(null);

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
  // const mapRef = React.useRef();
  // const onMapLoad = React.useCallback((map:undefined) => {
  //   mapRef.current = map;
  // }, []);
  console.log(data)
  if (!isLoaded)
    return <div className="text-center mt-5 text-3xl">Loading ...</div>
  return (
    <div>
      <div className="mt-10 border-4 border-orange-300 hover:border-indigo-400">
        <div>
          <GoogleMap
            zoom={20}
            center={center}
            mapContainerStyle={mapContainerStyle}
            mapContainerClassName="map-container"
            onLoad={onLoad}
            options={{
                disableDefaultUI: true,
                zoomControl: true,
                fullscreenControl: true
            }}
          >
            {markers.map((marker:any) => (
              <MarkerF
                key={`${marker.lat}-${marker.lng}`}
                position={center}
                onClick={() => {
                  setSelected(marker);
                }}
              />
            ))}
            {selected ? (
              <InfoWindowF
                position={center}
                onCloseClick={() => setSelected(null)}
              >
                <div>{data!.paperMaker.user.address!}</div>
              </InfoWindowF>
            ) : null}
          </GoogleMap>
        </div>
      </div>
      <div className="text-center mt-6">{data!.paperMaker.user.address!}</div>
    </div>
  )
}