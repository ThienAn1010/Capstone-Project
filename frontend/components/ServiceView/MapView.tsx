import { ClockIcon, TemplateIcon } from "@heroicons/react/outline"
import { FC, useState } from "react"
import ReactMapGL, { Marker } from "react-map-gl"
import { OfferedService } from "../../types/OfferedService"
import Star from "../Star"
import "mapbox-gl/dist/mapbox-gl.css"
interface MapViewProps {
  setMapView: () => void
  offeredServicesData: {
    offeredServices: OfferedService[]
    length: number
    numberOfRecords: number
  }
}

interface Viewport {
  latitude: number
  longitude: number
  zoom: number
}

const MapView: FC<MapViewProps> = ({
  setMapView,
  offeredServicesData: { offeredServices },
}) => {
  const [viewport, setViewport] = useState<Viewport>({
    latitude: 10.762622,
    longitude: 106.660172,
    zoom: 12,
  })
  console.log(offeredServices)
  return (
    <div className="w-full h-[calc(100vh-70px)] overflow-hidden relative">
      <div className="w-full absolute top-0 left-0 bg-white z-10 p-4 shadow-md">
        <div className="flex  justify-between container mx-auto items-center">
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
            Map View Mode
          </h1>
          <TemplateIcon
            className="h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-500 flex"
            onClick={setMapView}
          />
        </div>
      </div>
      <div className="w-1/4 absolute top-[60px] h-[calc(100%-60px)] left-0 z-10 p-5 shadow-md bg-[#efefef] overflow-auto">
        <div className="flex flex-col gap-y-5 ">
          {offeredServices.map((offeredService) => (
            <div
              key={offeredService.id}
              className="bg-white flex overflow-hidden rounded-md "
            >
              <div className="">
                <img
                  width="100%"
                  height="100%"
                  src={offeredService.paperMaker.user.picture}
                  alt="Image"
                  className="object-contain"
                />
              </div>
              <div className="px-4 py-2 flex-2">
                <h3 className="font-medium text-sm">
                  {offeredService.paperMaker.user.name}
                </h3>
                <div className="flex items-center">
                  <Star rating={offeredService.paperMaker.rating} />
                  <span className="flex text-xs text-[#999]">
                    ({offeredService.paperMaker.rating})
                  </span>
                </div>
                <div className="flex mt-2 items-center gap-x-3">
                  <p className="text-xs text-[#999]">
                    <span className="font-semibold text-base text-gray-900">
                      ${offeredService.price}
                    </span>
                    / service
                  </p>
                  <p className="flex items-baseline gap-x-0.5 text-xs text-[#999]">
                    <ClockIcon className="w-5 h-5 text-gray-900 font-semibold flex self-center" />
                    <span className="flex font-semibold text-base text-gray-900">
                      {offeredService.duration}
                    </span>
                    days
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ReactMapGL
        onMove={(evt) => setViewport(evt.viewState)}
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        {offeredServices.map((offeredService) => (
          <>
            <Marker
              key={offeredService.id}
              latitude={offeredService.paperMaker.lat}
              longitude={offeredService.paperMaker.long}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 fill-current text-blue-500 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </Marker>
          </>
        ))}
      </ReactMapGL>
    </div>
  )
}

export default MapView
