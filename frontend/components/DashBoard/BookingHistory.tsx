import {
  CheckCircleIcon,
  XCircleIcon,
  CheckIcon,
  DotsCircleHorizontalIcon,
} from "@heroicons/react/solid"
import dayjs from "dayjs"
import Link from "next/link"

export default function BookingHistory({ booking }: any) {
  console.log(booking)
  return (
    <div className="mt-5 mb-5">
      <div className="max-w-full mx-auto sm:px-2 lg:px-8">
        <div className="lg:col-span-1 lg:flex lg:items-center lg:space-x-0">
          <div
            key={booking.id}
            className="min-w-full bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border"
          >
            <div className="flex items-center p-4 border-b border-gray-200 sm:p-6 sm:grid sm:grid-cols-2 sm:gap-x-6">
              <dl className="flex-1 grid grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                <div>
                  <dt className="font-medium text-gray-900">Booking number</dt>
                  <dd className="mt-1 text-gray-500 font-normal">
                    {booking.id}
                  </dd>
                </div>
                <div className="hidden sm:block">
                  <dt className="font-medium text-gray-900">Date booked</dt>
                  <dd className="mt-1 text-gray-500 font-normal">
                    {dayjs(booking.createdAt).format("DD/MM/YYYY")}
                  </dd>
                </div>
                <div className="ml-10">
                  <dt className="font-medium text-gray-900">Total amount</dt>
                  <dd className="mt-1 font-medium text-gray-900">
                    ${booking.payAmount}
                  </dd>
                </div>
              </dl>
              <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4 mt-5">
                <Link key={booking.id} href={`/booking/${booking.id}`}>
                  <button
                    type="button"
                    className="cursor-pointer flex items-center justify-center bg-blue-200 py-2 px-2.5 border border-blue-200 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <p className="text-blue-700">View Booking</p>
                  </button>
                </Link>
                {booking.status === "success" && (
                  <button
                    type="button"
                    className="cursor-pointer flex items-center justify-center bg-blue-700 py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <span className="text-white">Review</span>
                  </button>
                )}
                {booking.status === "pendingFinished" && (
                  <button
                    type="button"
                    className="cursor-pointer flex items-center justify-center bg-blue-700 py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <span className="text-white">Complete</span>
                  </button>
                )}
              </div>
            </div>

            {/* Products */}
            <h4 className="sr-only">Orders</h4>
            <ul role="list" className="divide-y divide-gray-200">
              <li key={booking.id} className="p-4 sm:p-6">
                <div className="flex items-center sm:items-start">
                  <div className="flex-shrink-0 w-30 h-20 bg-gray-200 rounded-lg overflow-hidden sm:w-30 sm:h-20">
                    <img
                      src={booking.offeredService.paperMaker.user.picture}
                      alt="Papermaker Image"
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <div className="flex-1 ml-6 text-sm">
                    <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                      <h5>{booking.offeredService.paperMaker.user.name}</h5>
                      <p className="mt-2 sm:mt-0">
                        ${booking.offeredService.price}
                      </p>
                    </div>
                    <p className="hidden text-gray-500 text-justify sm:block sm:mt-2">
                      {booking.offeredService.description}
                    </p>
                  </div>
                </div>
                <div className="mt-6 sm:flex sm:justify-between">
                  {booking.status == "pendingConfirm" ? (
                    <div className="flex items-center">
                      <DotsCircleHorizontalIcon
                        className="w-5 h-5 text-yellow-500"
                        aria-hidden="true"
                      />
                      <p className="ml-2 text-sm font-medium text-gray-500">
                        Status: Pending Confirm
                      </p>
                    </div>
                  ) : null}
                  {booking.status == "pendingFinished" ? (
                    <div className="flex items-center">
                      <DotsCircleHorizontalIcon
                        className="w-5 h-5 text-yellow-500"
                        aria-hidden="true"
                      />
                      <p className="ml-2 text-sm font-medium text-gray-500">
                        Status: Pending Finished
                      </p>
                    </div>
                  ) : null}
                  {booking.status == "accept" ? (
                    <div className="flex items-center">
                      <CheckIcon
                        className="w-5 h-5 text-green-500"
                        aria-hidden="true"
                      />
                      <p className="ml-2 text-sm font-medium text-gray-500">
                        Status: Accept
                      </p>
                    </div>
                  ) : null}
                  {booking.status == "success" ? (
                    <div className="flex items-center">
                      <CheckCircleIcon
                        className="w-5 h-5 text-green-500"
                        aria-hidden="true"
                      />
                      <p className="ml-2 text-sm font-medium text-gray-500">
                        Status: Success
                      </p>
                    </div>
                  ) : null}
                  {booking.status == "deny" ? (
                    <div className="flex items-center">
                      <XCircleIcon
                        className="w-5 h-5 text-red-500"
                        aria-hidden="true"
                      />
                      <p className="ml-2 text-sm font-medium text-gray-500">
                        Status: Denied
                      </p>
                    </div>
                  ) : null}
                  {booking.status == "drop" &&
                  booking.isFinishedConfirmed === true ? (
                    <div className="flex items-center">
                      <XCircleIcon
                        className="w-5 h-5 text-red-500"
                        aria-hidden="true"
                      />
                      <p className="ml-2 text-sm font-medium text-gray-500">
                        Status: Cancelled
                      </p>
                    </div>
                  ) : null}
                  {booking.status == "drop" &&
                  booking.isFinishedConfirmed === false ? (
                    <div className="flex items-center">
                      <XCircleIcon
                        className="w-5 h-5 text-red-500"
                        aria-hidden="true"
                      />
                      <p className="ml-2 text-sm font-medium text-gray-500">
                        Status: Pending Refund
                      </p>
                    </div>
                  ) : null}
                  <div className="mt-6 border-t border-gray-200 pt-4 flex items-center space-x-4 divide-x divide-gray-200 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
                    <div className="flex-1 flex justify-center">
                      <Link
                        key={booking.offeredService.id}
                        href={`/service/${booking.offeredService.id}`}
                      >
                        <a className="text-blue-700 whitespace-nowrap hover:text-blue-900 hover:cursor-pointer">
                          View papermaker
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
