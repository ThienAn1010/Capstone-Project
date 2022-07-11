import type { NextPage } from "next"
import { useRouter } from "next/router"
import BookNow from "../../components/BookNow"
import Feedback from "../../components/Feedback"
import useGetOfferedService from "../../hooks/useGetOfferedService"

const Detail: NextPage = () => {
  const router = useRouter()
  const { data, error, isLoading } = useGetOfferedService(
    router.query.id as string
  )
  console.log({ data, error, isLoading })
  return (
    <div className="container mx-auto px-14 py-12 ">
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 space-y-8">
          {isLoading ? (
            <h1 className="text-3xl font-bold animate-pulse bg-gray-400 h-[36px]"></h1>
          ) : (
            <h1 className="text-3xl font-bold  text-gray-900">
              {`${data?.paperMaker.user.name}-${data?.service.name}`}
            </h1>
          )}
          <div className="flex space-x-8 px-4">
            {isLoading ? (
              <img
                src="https://as1.ftcdn.net/jpg/01/91/95/30/220_F_191953033_gehQATeDoh5z6PyRDbeKyBZuS83CjMEF.jpg"
                alt="Loading..."
                className="h-48 w-48 rounded-full object-cover border-2"
              ></img>
            ) : (
              <img
                className="h-48 w-48 rounded-full"
                alt="User Avatar"
                src={data?.paperMaker.user.picture}
              />
            )}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">About me</h2>
              <p className="text-justify">
                Hello! My name is Phuong. Lorem, ipsum dolor sit amet
                consectetur adipisicing elit. Fuga expedita omnis ullam dicta
                quaerat modi quisquam rem quos pariatur accusantium eligendi
                perspiciatis, laborum provident, fugit ab nihil quam cupiditate.
                Et.
              </p>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Service</h2>
          <h2 className="text-xl font-semibold text-gray-900">Statistics</h2>
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