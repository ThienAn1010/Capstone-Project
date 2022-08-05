import { ClockIcon, TemplateIcon } from "@heroicons/react/outline"
import { FC, useState } from "react"
import ReactMapGL from "react-map-gl"
import { OfferedService } from "../../types/OfferedService"
import Star from "../Star"

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
      <div className="w-1/4 absolute top-[60px] h-[calc(100%-60px)] left-0 z-10 p-5 shadow-md bg-[#efefef]">
        <div className="bg-white flex overflow-hidden rounded-sm">
          <div>
            <img src={offeredServices[0].paperMaker.user.picture} alt="Image" />
          </div>
          <div className="px-4 py-2 flex-1">
            <h3 className="font-medium text-sm">
              {offeredServices[0].paperMaker.user.name}
            </h3>
            <div className="flex items-center">
              <Star rating={offeredServices[0].paperMaker.rating} />
              <span className="flex text-xs text-[#999]">
                ({offeredServices[0].paperMaker.rating})
              </span>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="text-xs text-[#999]">
                <span className="font-semibold text-base text-gray-900">
                  ${offeredServices[0].price}
                </span>
                / service
              </p>
              <p className="flex items-baseline gap-x-0.5 text-xs text-[#999]">
                <ClockIcon className="w-5 h-5 text-gray-900 font-semibold flex self-center" />
                <span className="flex font-semibold text-base text-gray-900">
                  {offeredServices[0].duration}
                </span>
                days
              </p>
            </div>
          </div>
        </div>
      </div>
      <ReactMapGL
        onMove={(evt) => setViewport(evt.viewState)}
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      ></ReactMapGL>
    </div>
  )
}

export default MapView
