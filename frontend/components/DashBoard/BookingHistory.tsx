import { CheckCircleIcon } from "@heroicons/react/solid"

export default function BookingHistory({ booking }: any) {
  return (
      <div className="mt-5 mb-5">
        <div className="max-w-full mx-auto sm:px-2 lg:px-8">
          <div className="lg:col-span-1 lg:flex lg:items-center lg:space-x-0">
            <div
              key={booking.id}
              className="bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border"
            >
              <div className="flex items-center p-4 border-b border-gray-200 sm:p-6 sm:grid sm:grid-cols-2 sm:gap-x-6">
                <dl className="flex-1 grid grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                  <div>
                    <dt className="font-medium text-gray-900">
                      Booking number
                    </dt>
                    <dd className="mt-1 text-gray-500 font-normal">{booking.id}</dd>
                  </div>
                  <div className="hidden sm:block">
                    <dt className="font-medium text-gray-900">Date booked</dt>
                    <dd className="mt-1 text-gray-500 font-normal">
                      <time dateTime={booking.offeredService.createdAt}>
                        {booking.offeredService.createdAt}
                      </time>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900">Total amount</dt>
                    <dd className="mt-1 font-medium text-gray-900">
                      ${booking.payAmount}
                    </dd>
                  </div>
                </dl>
                <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4 mt-5">
                  <a
                    className="flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span>View Booking</span>
                    <span className="sr-only">{booking.id}</span>
                  </a>
                  <a
                    className="flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span>View Invoice</span>
                    <span className="sr-only">for order {booking.id}</span>
                  </a>
                </div>
              </div>

              {/* Products */}
              <h4 className="sr-only">Items</h4>
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
                      <p className="hidden text-gray-500 sm:block sm:mt-2">
                        {booking.offeredService.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 sm:flex sm:justify-between">
                    <div className="flex items-center">
                      <CheckCircleIcon
                        className="w-5 h-5 text-green-500"
                        aria-hidden="true"
                      />
                      <p className="ml-2 text-sm font-medium text-gray-500">
                        Status:{" "}{booking.status}
                      </p>
                      {/* <p className="ml-2 text-sm font-medium text-gray-500">
                        Finished on{" "}
                        <time dateTime={booking.offeredService.createdAt}>
                          {booking.offeredService.createdAt}
                        </time>
                      </p>
                       */}
                    </div>

                    <div className="mt-6 border-t border-gray-200 pt-4 flex items-center space-x-4 divide-x divide-gray-200 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
                      <div className="flex-1 flex justify-center">
                        <a
                          className="text-indigo-600 whitespace-nowrap hover:text-indigo-500"
                        >
                          View papermaker
                        </a>
                      </div>
                      <div className="flex-1 pl-4 flex justify-center">
                        <a
                          href="#"
                          className="text-indigo-600 whitespace-nowrap hover:text-indigo-500"
                        >
                          Book again
                        </a>
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
