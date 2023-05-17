import type { NextPage } from "next"
import { useRouter } from "next/router"
import BookNow from "../../../components/BookNow"
import Feedback from "../../../components/Feedback"
import useGetOfferedService from "../../../hooks/useGetOfferedService"
import { StarIcon } from "@heroicons/react/solid"
import {
  BriefcaseIcon,
  ClockIcon,
  LocationMarkerIcon,
  ChartSquareBarIcon,
} from "@heroicons/react/outline"
import DetailLoader from "../../../components/LoadingSkeleton/detailLoader"
import Map from "../../../components/Map/Map"

const Detail: NextPage = () => {
  const router = useRouter()
  const { data, error, isLoading } = useGetOfferedService(
    router.query.id as string
  )
  console.log({ data, error, isLoading })
  return (
    <>
      {isLoading ? (
        <DetailLoader />
      ) : (
        <div className="container mx-auto px-14 py-12">
          <div className="grid grid-cols-3 gap-2 ">
            <div className="col-span-2 space-y-8 pl-32 pr-2">
              <div className="flex space-x-6 mb8 ">
                <div>
                  <img
                    className="inline-block h-60 w-60 rounded-full"
                    src={data?.paperMaker.user.picture}
                    alt="papermaker avatar"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold uppercase text-gray-500 ">
                    PaperMaker
                  </h3>
                  <h3 className="text-4xl font-bold text-gray-900">
                    {data?.paperMaker.user.name}
                  </h3>
                  <div className="flex items-center">
                    <StarIcon
                      className="flex-shrink-0 h-6 w-6 text-yellow-400"
                      aria-hidden="true"
                    />
                    <StarIcon
                      className="flex-shrink-0 h-6 w-6 text-yellow-400"
                      aria-hidden="true"
                    />
                    <StarIcon
                      className="flex-shrink-0 h-6 w-6 text-yellow-400"
                      aria-hidden="true"
                    />
                    <StarIcon
                      className="flex-shrink-0 h-6 w-6 text-yellow-400"
                      aria-hidden="true"
                    />
                    <StarIcon
                      className="flex-shrink-0 h-6 w-6 text-yellow-400"
                      aria-hidden="true"
                    />
                    <p>&nbsp;(149)</p>
                    <p className="text-slate-500">&nbsp;22 Orders in Queue</p>
                  </div>
                  <div className="flex items-center">
                    <BriefcaseIcon className="flex-shrink-0 h-6 w-6 " />
                    <p className="font-semibold">&nbsp;{data?.service.name}</p>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="flex-shrink-0 h-6 w-6 " />
                    <p className="font-semibold">&nbsp;{data?.duration} days</p>
                  </div>
                  <div className="flex items-center">
                    <LocationMarkerIcon className="flex-shrink-0 h-6 w-6 " />
                    <p className="font-semibold">
                      &nbsp;District 1, Ho Chi Minh City
                    </p>
                  </div>
                  <div className="flex items-center">
                    <ChartSquareBarIcon className="flex-shrink-0 h-6 w-6 " />
                    <p className="font-semibold">
                      &nbsp;{data?.paperMaker.totalCases} Total Orders
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-10">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Description
                  </h2>
                  <p className="text-justify mt-2 leading-relaxed">
                    {data?.description}
                  </p>
                </div>
              </div>
              <div className="px-10">
                <h2 className="text-2xl font-bold text-gray-900">
                  Required Documents
                </h2>
                <p className="text-justify mt-2">{data?.documents}</p>
              </div>
              <div className="px-10 pb-8">
                <h2 className="text-2xl font-bold text-gray-900 ">
                  Estimated Duration
                </h2>
                <p className="text-justify mt-2">{data?.estimate}</p>
              </div>
              <div className="pb-8 px-10">
                <h2 className="text-2xl font-bold text-gray-900 ">
                  Location
                </h2>
                <Map />
              </div>
              <div className="pt-10 border-t-2">
                <Feedback />
              </div>
            </div>
            <div className="ml-12">
              <BookNow />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Detail
