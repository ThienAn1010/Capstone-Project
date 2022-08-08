import React from "react"
import { CheckIcon } from "@heroicons/react/outline"
import useGetOfferedService from "../hooks/useGetOfferedService"
import { useRouter } from "next/router"
import axiosInstance from "../util/axiosInstace"
const serviceDetails = [
  "Deliver within 7 working days",
  "Real-time progress tracking",
  "Cancel at any given time",
  "Secure transaction",
  "Support 24/7",
]

const BookNow = () => {
  const router = useRouter()
  const { data, isLoading } = useGetOfferedService(router.query.id as string)

  const handleOnClick = async () => {
    try {
      const body = {
        name: `${data?.paperMaker.user.name} - ${data?.service.name}`,
        description: data?.description,
        amount: data?.price,
        id: data?.id,
      }
      const response = await axiosInstance.post("/checkout", body)
      router.push(response.data.session)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className={`max-w-xs shadow-md p-5 rounded-sm overflow-hidden block transition`}
    >
      <div className="-mx-5 -mt-5 relative">
        {isLoading ? (
          <img
            src="https://as1.ftcdn.net/jpg/01/91/95/30/220_F_191953033_gehQATeDoh5z6PyRDbeKyBZuS83CjMEF.jpg"
            alt="Loading..."
            className="h-48 w-full object-cover border-2"
          ></img>
        ) : (
          <>
            <div className="w-full h-full absolute bg-gray-400 opacity-40 z-0"></div>
            <img
              src={data?.paperMaker.user.picture}
              className="h-48 w-full"
              alt="Avatar"
            />
          </>
        )}
      </div>
      {isLoading ? (
        <>
          <h3 className="text-3xl font-bold mt-3 animate-pulse h-8 bg-gray-300 w-1/3"></h3>
          <div className="w-full bg-gray-300 text-white mt-1.5 py-1 animate-pulse h-7"></div>
        </>
      ) : (
        <>
          <h3 className="text-3xl font-bold mt-3">${data?.price}</h3>
          <button
            className="w-full bg-blue-500 text-white mt-1.5 py-1"
            onClick={handleOnClick}
          >
            Book now
          </button>
        </>
      )}
      {/* <p className="text-sm text-center my-2 text-gray-500">
        Cancel at any time
      </p> */}
      <h4 className="font-medium mt-5">The service includes</h4>
      <ul className="text-sm space-y-1.5 mt-1">
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <li
                key={index}
                className="animate-pulse bg-gray-400 h-3.5 w-full mb-2"
              ></li>
            ))
          : serviceDetails.map((detail) => (
              <li key={detail} className="flex items-center gap-x-2">
                <CheckIcon className="font-medium w-4 h-4 text-blue-500" />
                <span>
                  {detail.includes("Deliver")
                    ? `${detail.replace("7", data!.duration.toString())}`
                    : detail}
                </span>
              </li>
            ))}
      </ul>
    </div>
  )
}

export default BookNow
