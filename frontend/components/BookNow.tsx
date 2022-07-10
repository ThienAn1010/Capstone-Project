import React, { useEffect, useRef } from "react"
import { CheckIcon } from "@heroicons/react/outline"
import useGetOfferedService from "../hooks/useGetOfferedService"
import { useRouter } from "next/router"
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
  const element = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(() => {})
    intersectionObserver.observe(element.current!)
    return () => intersectionObserver.disconnect()
  }, [])

  return (
    <div
      className={`max-w-xs shadow-md p-5 rounded-sm overflow-hidden block transition`}
      ref={element}
    >
      <div className="-mx-5 -mt-5 relative">
        <div className="w-full h-full absolute bg-gray-400 opacity-40 z-0"></div>
        <img
          src="https://images.smartcapitalmind.com/person-using-pen-near-documents-and-chart.jpg"
          className="w-full h-full"
          alt="Avatar"
        />
      </div>
      {isLoading ? (
        <>
          <h3 className="text-3xl font-bold mt-3 animate-pulse h-8 bg-gray-300 w-1/3"></h3>
          <div className="w-full bg-gray-300 text-white mt-1.5 py-1 animate-pulse h-7"></div>
        </>
      ) : (
        <>
          <h3 className="text-3xl font-bold mt-3">${data?.price}</h3>
          <button className="w-full bg-blue-500 text-white mt-1.5 py-1">
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
