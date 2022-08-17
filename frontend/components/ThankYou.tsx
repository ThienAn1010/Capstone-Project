import Link from "next/link"
import useGetMe from "../hooks/useGetMe"

const ThankYou = () => {
  const { data } = useGetMe()
  return (
    <div className="flex items-center justify-center py-10 rounded-xl">
      <div className="p-1 rounded px-4 py-4">
        <div className="flex flex-col items-center p-4 space-y-6 bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-600 w-28 h-28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-4xl font-bold text-blue-600">Thank You!</h1>
          <p className="text-xl font-semibold ">
            Thank you for your interest! We will notify when your booking is
            approved.
          </p>
          <div className="flex space-x-6">
            <Link href="/">
              <div className="inline-flex items-center space-x-2 px-4 py-2 text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring hover:cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                  />
                </svg>
                <p className="text-lg font-medium">Home</p>
              </div>
            </Link>
            <Link href={`/profile/${data?.id}?tab=service`}>
              <div className="inline-flex items-center space-x-2 px-4 py-2 text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring hover:cursor-pointer">
                <p className="text-lg font-medium">My Booking</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ThankYou
