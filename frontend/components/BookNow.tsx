import React from "react"
import { CheckIcon } from "@heroicons/react/outline"
import useGetOfferedService from "../hooks/useGetOfferedService"
import { useRouter } from "next/router"
import useGetMe from "../hooks/useGetMe"
import Link from "next/link"
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
  const { data: userData } = useGetMe()
  return (
    <div className="max-w-xs border border-slate-300 p-5 rounded-md overflow-hidden block transition space-y-6">
      {isLoading ? (
        <>
          <h3 className="text-3xl font-bold mt-3 animate-pulse h-8 bg-gray-300 w-1/3"></h3>
          <div className="w-full bg-gray-300 text-white mt-1.5 py-1 animate-pulse h-7"></div>
        </>
      ) : (
        <>
          <h3 className="text-4xl font-bold">${data?.price}</h3>
        </>
      )}
      <div>
        <h4 className="font-medium">The service includes</h4>
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
      {userData ? (
        <Link href={`/service/${router.query.id}/checkout`}>
          <button className="booknow">
            <div className="svg-wrapper-1">
              <div className="svg-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <span>Book Now</span>
          </button>
        </Link>
      ) : (
        <Link href="/login">
          <button
            className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-md leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          >
            Sign in to book
          </button>
        </Link>
      )}
    </div>
  )
}

export default BookNow
