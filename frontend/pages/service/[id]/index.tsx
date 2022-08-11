import type { NextPage } from "next"
import { useRouter } from "next/router"
import BookNow from "../../../components/BookNow"
import Feedback from "../../../components/Feedback"
import useGetOfferedService from "../../../hooks/useGetOfferedService"

const Detail: NextPage = () => {
  const router = useRouter()
  const { data, error, isLoading } = useGetOfferedService(
    router.query.id as string
  )
  console.log({ data, error, isLoading })
  return (
    <div className="container mx-auto px-14 py-12 ">
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 space-y-8 pl-28 pr-8">
          <div>
            <h3 className="text-xl font-bold uppercase text-gray-500 ">
              PaperMaker
            </h3>
            {isLoading ? (
              <h1 className="text-4xl font-bold animate-pulse bg-gray-500 h-[36px]"></h1>
            ) : (
              <>
                <h3 className="text-4xl font-bold text-gray-900 my-1">
                  {`${data?.paperMaker.user.name}`}
                </h3>
                {/* <h3 className="text-xl font-semibold text-gray-900 my-1">
                  {`${data?.service.name}`}
                </h3> */}
              </>
            )}
          </div>
          <div className="flex space-x-8">
            <div>
              <h3 className="font-bold text-gray-500 text-xl">Total Orders</h3>
              <h2 className="text-center text-2xl font-bold">{`${data?.paperMaker.totalCases}`}</h2>
            </div>
            <div>
              <h3 className="font-bold text-gray-500 text-xl">Rating</h3>
              <h2 className="text-center text-2xl font-bold">{`${data?.paperMaker.rating}`}</h2>
            </div>
          </div>
          <div className="space-x-8">
            <div className="">
              <h2 className="text-xl font-bold text-gray-900">About me</h2>
              {isLoading ? (
                <>
                  <p className="animate-pulse bg-gray-400 w-full h-5"></p>
                  <p className="animate-pulse bg-gray-400 w-full h-5"></p>
                  <p className="animate-pulse bg-gray-400 w-full h-5"></p>
                  <p className="animate-pulse bg-gray-400 w-full h-5"></p>
                  <p className="animate-pulse bg-gray-400 w-full h-5"></p>
                </>
              ) : (
                <p className="text-justify">{data?.paperMaker.aboutMe}</p>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Service</h2>
            <p>{data?.description}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Statistics</h2>
          </div>
          <div className="pt-16">
            <Feedback />
          </div>
        </div>
        <div className="relative ml-14">
          <BookNow />
        </div>
      </div>
    </div>
  )
}
export default Detail
