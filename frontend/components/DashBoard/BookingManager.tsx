import { Fragment, useRef, useState } from "react"
import { Menu, Dialog, Transition } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/outline"
import {
  CheckCircleIcon,
  XCircleIcon,
  DocumentTextIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid"
import useGetPaperMakerBooking from "../../hooks/useGetPaperMakerBooking"
import LoadingSpinner from "../LoadingSkeleton/LoadingSpinner"
import axiosInstance from "../../util/axiosInstace"
import toast from "react-hot-toast"
import { useRouter } from "next/router"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function BookingManager() {
  const { data, isLoading } = useGetPaperMakerBooking()
  const [openAccept, setOpenAccept] = useState(false)
  const [openDecline, setOpenDecline] = useState(false)
  const [openFinish, setopenFinish] = useState(false)
  const [bookingId, setBookingId] = useState("")
  const cancelButtonRef = useRef(null)
  const router = useRouter()

  const acceptOrDenyOrder = (action: string) => {
    const acceptOrDenyService = (async () => {
      const response = await axiosInstance.patch(`/bookings/${bookingId}`, {
        status: action,
      })
      return response
    })()
    toast.promise(
      acceptOrDenyService,
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
      <div className="py-4 lg:col-span-9">
        {isLoading ? (
          <div className="container mx-auto p-20">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">Users</h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the users in your account including their name,
                  title, email and role.
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-y-visible shadow ring-1 mb-28 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300 table-fixed">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Phone
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Address
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Note
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                          >
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {data.bookings.length == 0 ? (
                          <tr>
                            <td colSpan={5}>
                              <p className="text-lg text-center font-semibold p-4">
                                You do not have any booking yet!
                              </p>
                            </td>
                          </tr>
                        ) : (
                          <>
                            {data.bookings.map((booking: any) => (
                              <tr key={booking.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                  <div className="flex items-center">
                                    <div className="h-10 w-10 flex-shrink-0">
                                      <img
                                        className="h-10 w-10 rounded-full"
                                        src={booking.user.picture}
                                        alt="idk"
                                      />
                                    </div>
                                    <div className="ml-4">
                                      <div className="font-medium text-gray-900">
                                        {booking.user.name}
                                      </div>
                                      <div className="text-gray-500">
                                        {booking.user.username}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  <div className="text-gray-900">
                                    {booking.user.phoneNumber}
                                  </div>
                                </td>
                                <td className="max-w-[200px] px-2 py-4 text-sm text-gray-500">
                                  <p className="text-sm h-full w-full line-clamp-3">
                                    {booking.user.address}
                                  </p>
                                </td>
                                <td className="max-w-[200px] px-2 py-4 text-sm text-gray-500">
                                  <p className="text-sm line-clamp-3">
                                    {!booking.note ||
                                    booking.note === "undefined"
                                      ? "None"
                                      : booking.note}
                                  </p>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {booking.status === "pendingConfirm" && (
                                    <span className="inline-flex rounded-md bg-yellow-100 px-4 py-2 font-semibold leading-5 text-yellow-800 text-sm">
                                      Pending
                                    </span>
                                  )}
                                  {booking.status === "accept" && (
                                    <span className="inline-flex rounded-md bg-green-100 px-4 py-2 font-semibold leading-5 text-green-800 text-sm">
                                      In Progress
                                    </span>
                                  )}
                                  {booking.status === "deny" && (
                                    <span className="inline-flex rounded-md bg-red-100 px-4 py-2 font-semibold leading-5 text-red-800 text-sm">
                                      Declined
                                    </span>
                                  )}
                                  {booking.status === "drop" &&
                                    booking.isDroppedConfirmed === false && (
                                      <span className="inline-flex rounded-md bg-orange-100 px-4 py-2 font-semibold leading-5 text-orange-800 text-sm">
                                        Pending Cancel
                                      </span>
                                    )}
                                  {booking.status === "drop" &&
                                    booking.isDroppedConfirmed === true && (
                                      <span className="inline-flex rounded-md bg-red-100 px-4 py-2 font-semibold leading-5 text-red-800 text-sm">
                                        Cancelled
                                      </span>
                                    )}
                                  {booking.status === "success" &&
                                    booking.isFinishedConfirmed === false && (
                                      <span className="inline-flex rounded-md bg-indigo-100 px-4 py-2 font-semibold leading-5 text-indigo-800 text-sm">
                                        Pending Finished
                                      </span>
                                    )}
                                  {booking.status === "success" &&
                                    booking.isFinishedConfirmed === true && (
                                      <span className="inline-flex rounded-md bg-emerald-100 px-4 py-2 font-semibold leading-5 text-emerald-800 text-sm">
                                        Finished
                                      </span>
                                    )}
                                </td>
                                <td className="whitespace-nowrap space-y-4 py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                  <Menu
                                    as="div"
                                    className="relative inline-block text-left"
                                  >
                                    <div>
                                      <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none ">
                                        Action
                                        <ChevronDownIcon
                                          className="-mr-1 ml-2 h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </Menu.Button>
                                    </div>

                                    <Transition
                                      as={Fragment}
                                      enter="transition ease-out duration-100"
                                      enterFrom="transform opacity-0 scale-95"
                                      enterTo="transform opacity-100 scale-100"
                                      leave="transition ease-in duration-75"
                                      leaveFrom="transform opacity-100 scale-100"
                                      leaveTo="transform opacity-0 scale-95"
                                    >
                                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 divide-y divide-gray-100 focus:outline-none">
                                        <div className="py-1">
                                          {booking.status ===
                                            "pendingConfirm" && (
                                            <>
                                              <Menu.Item>
                                                {({ active }) => (
                                                  <p
                                                    onClick={() => {
                                                      setOpenAccept(true)
                                                      setBookingId(booking.id)
                                                    }}
                                                    className={classNames(
                                                      active
                                                        ? "bg-emerald-100 text-gray-900"
                                                        : "text-gray-700",
                                                      "group flex items-center px-4 py-2 text-sm hover:cursor-pointer"
                                                    )}
                                                  >
                                                    <CheckCircleIcon
                                                      className="mr-3 h-5 w-5 text-emerald-400"
                                                      aria-hidden="true"
                                                    />
                                                    Accept
                                                  </p>
                                                )}
                                              </Menu.Item>
                                              <Menu.Item>
                                                {({ active }) => (
                                                  <p
                                                    onClick={() => {
                                                      setOpenDecline(true)
                                                      setBookingId(booking.id)
                                                    }}
                                                    className={classNames(
                                                      active
                                                        ? "bg-rose-100 text-gray-900"
                                                        : "text-gray-700",
                                                      "group flex items-center px-4 py-2 text-sm hover:cursor-pointer"
                                                    )}
                                                  >
                                                    <XCircleIcon
                                                      className="mr-3 h-5 w-5 text-rose-400 "
                                                      aria-hidden="true"
                                                    />
                                                    Decline
                                                  </p>
                                                )}
                                              </Menu.Item>
                                            </>
                                          )}
                                          {booking.status === "accept" && (
                                            <>
                                              <Menu.Item>
                                                {({ active }) => (
                                                  <p
                                                    onClick={() => {
                                                      setopenFinish(true)
                                                      setBookingId(booking.id)
                                                    }}
                                                    className={classNames(
                                                      active
                                                        ? "bg-emerald-100 text-gray-900"
                                                        : "text-gray-700",
                                                      "group flex items-center px-4 py-2 text-sm hover:cursor-pointer"
                                                    )}
                                                  >
                                                    <CheckCircleIcon
                                                      className="mr-3 h-5 w-5 text-emerald-400"
                                                      aria-hidden="true"
                                                    />
                                                    Finish
                                                  </p>
                                                )}
                                              </Menu.Item>
                                            </>
                                          )}
                                          <Menu.Item>
                                            {({ active }) => (
                                              <p
                                                className={classNames(
                                                  active
                                                    ? "bg-cyan-100 text-gray-900"
                                                    : "text-gray-700",
                                                  "group flex items-center px-4 py-2 text-sm hover:cursor-pointer"
                                                )}
                                                onClick={() =>
                                                  router.push(
                                                    `/booking/${booking.id}`
                                                  )
                                                }
                                              >
                                                <DocumentTextIcon
                                                  className="mr-3 h-5 w-5 text-cyan-400 "
                                                  aria-hidden="true"
                                                />
                                                View details
                                              </p>
                                            )}
                                          </Menu.Item>
                                        </div>
                                      </Menu.Items>
                                    </Transition>
                                  </Menu>
                                </td>
                              </tr>
                            ))}
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* This is the modal for accept message. */}
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
                      Accept Booking
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-gray-500">
                        Are you sure that you want to accept this booking?
                      </p>
                      <p className="text-sm text-gray-500">
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
                      acceptOrDenyOrder("accept")
                    }}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* This is the modal for decline message. */}
      <Transition.Root show={openDecline} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpenDecline}
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
                    <XCircleIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Decline Booking
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure that you want to decline this booking?
                      </p>
                      <p className="text-sm text-gray-500">
                        You can not undo this action.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-semibold text-white hover:bg-red-700 focus:outline-none sm:col-start-1 sm:text-sm"
                    onClick={() => {
                      setOpenDecline(false)
                      acceptOrDenyOrder("deny")
                    }}
                  >
                    Decline
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:col-start-2 sm:text-sm"
                    onClick={() => setOpenDecline(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* This is the modal for cancel message. */}
      <Transition.Root show={openFinish} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setopenFinish}
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
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100">
                    <CheckCircleIcon
                      className="h-6 w-6 text-emerald-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Finish Booking
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure that you want to confirm finishing this
                        booking?
                      </p>
                      <p className="text-sm text-gray-500">
                        You can not undo this action.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-semibold text-white hover:bg-red-700 focus:outline-none sm:col-start-1 sm:text-sm"
                    onClick={() => {
                      setopenFinish(false)
                      acceptOrDenyOrder("success")
                    }}
                  >
                    Yes, finish this booking
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:col-start-2 sm:text-sm"
                    onClick={() => setopenFinish(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
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
