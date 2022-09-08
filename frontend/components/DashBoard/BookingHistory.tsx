import {
  CheckCircleIcon,
  XCircleIcon,
  CheckIcon,
  DotsCircleHorizontalIcon,
} from "@heroicons/react/solid"
import dayjs from "dayjs"
import Link from "next/link"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useRef, useState } from "react"
import axiosInstance from "../../util/axiosInstace"
import toast from "react-hot-toast"
import { useRouter } from "next/router"

export default function BookingHistory({ booking }: any) {
  console.log(booking)
  const [openAccept, setOpenAccept] = useState(false)
  const cancelButtonRef = useRef(null)
  const router = useRouter()

  const finishBooking = () => {
    const finish = (async () => {
      const response = await axiosInstance.patch(`/bookings/${booking.id}`, {
        isFinishedConfirmed: true,
      })
      return response
    })()
    toast.promise(
      finish,
      {
        loading: "Processing...",
        error: () => {
          return "Something went wrong. Try again later !!!"
        },
        success: () => {
          router.reload()
          return "Success"
        },
      },
      {
        position: "bottom-left",
      }
    )
  }

  return (
    <>
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
                    <dt className="font-medium text-gray-900">
                      Booking Number
                    </dt>
                    <dd className="mt-1 text-gray-500 font-normal">
                      {booking.id}
                    </dd>
                  </div>
                  <div className="hidden sm:block">
                    <dt className="font-medium text-gray-900">Booking Date</dt>
                    <dd className="mt-1 text-gray-500 font-normal">
                      {dayjs(booking.createdAt).format("DD/MM/YYYY")}
                    </dd>
                  </div>
                  <div className="ml-10">
                    <dt className="font-medium text-gray-900">Total Amount</dt>
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
                  {booking.status === "success" &&
                    booking.isFinishedConfirmed === false && (
                      <button
                        type="button"
                        className="cursor-pointer flex items-center justify-center bg-blue-700 py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => {
                          setOpenAccept(true)
                        }}
                      >
                        <span className="text-white">Finish</span>
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
                    {booking.status == "accept" ? (
                      <div className="flex items-center">
                        <CheckIcon
                          className="w-5 h-5 text-green-500"
                          aria-hidden="true"
                        />
                        <p className="ml-2 text-sm font-medium text-gray-500">
                          Status: In Progress
                        </p>
                      </div>
                    ) : null}
                    {booking.status == "success" &&
                    booking.isFinishedConfirmed === true ? (
                      <div className="flex items-center">
                        <CheckCircleIcon
                          className="w-5 h-5 text-green-500"
                          aria-hidden="true"
                        />
                        <p className="ml-2 text-sm font-medium text-gray-500">
                          Status: Finished
                        </p>
                      </div>
                    ) : null}
                    {booking.status == "success" &&
                    booking.isFinishedConfirmed === false ? (
                      <div className="flex items-center">
                        <DotsCircleHorizontalIcon
                          className="w-5 h-5 text-green-500"
                          aria-hidden="true"
                        />
                        <p className="ml-2 text-sm font-medium text-gray-500">
                          Status: Pending Finish
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
                          Status: Declined
                        </p>
                      </div>
                    ) : null}
                    {booking.status == "drop" &&
                    booking.isDroppedConfirmed === true ? (
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
                    booking.isDroppedConfirmed === false ? (
                      <div className="flex items-center">
                        <DotsCircleHorizontalIcon
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
                            View Papermaker
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
      <Transition.Root show={openAccept} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpenAccept}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <CheckIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Finish This Booking?
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-gray-500">
                        Are you sure that you want to confirm finishing this
                        booking?
                      </p>
                      <p className="text-gray-500 mt-1">
                        You can not undo this action.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:col-start-2 sm:text-sm"
                    onClick={() => setOpenAccept(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border  shadow-sm px-4 py-2 bg-green-600 text-base font-semibold text-white hover:bg-green-700 focus:outline-none sm:col-start-1 sm:text-sm"
                    onClick={() => {
                      setOpenAccept(false)
                      finishBooking()
                    }}
                  >
                    Finish
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
