import dayjs from "dayjs"

const products = [
  {
    id: 1,
    name: "Nomad Tumbler",
    description:
      "This durable and portable insulated tumbler will keep your beverage at the perfect temperature during your next adventure.",
    href: "#",
    price: "35.00",
    status: "Preparing to ship",
    step: 0,
    date: "March 24, 2021",
    datetime: "2021-03-24",
    address: ["Floyd Miles", "7363 Cynthia Pass", "Toronto, ON N3Y 4H8"],
    email: "f•••@example.com",
    phone: "1•••••••••40",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/confirmation-page-03-product-01.jpg",
    imageAlt: "Insulated bottle with white base and black snap lid.",
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function BookingDetail({ booking }: any) {
  return (
    <div className="bg-checkout">
      <div className="max-w-2xl mx-auto pt-16 sm:py-2 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* Products */}
        <div className="mt-6">
          <h2 className="sr-only">Products purchased</h2>
          <div className="space-y-8">
            <div className="bg-white border-t border-b border-gray-200 shadow-sm sm:border sm:rounded-lg">
              <div className="py-2 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
                <div className="pb-2 justify-between border-b sm:flex lg:col-span-12">
                  <div>
                    <div className="flex items-center text-gray-500 hover:cursor-pointer">
                      &larr;
                      <p className="text-gray-500">Back</p>
                    </div>
                  </div>
                  <div className="flex items-baseline divide-x divide-gray-400">
                    <div className="flex items-baseline">
                      <p className="text-gray-500 uppercase">Order ID&nbsp;</p>
                      <p className="text-gray-500 pr-2">{booking.id}</p>
                    </div>
                    <div>
                      <p className="ml-2 px-2 rounded-md bg-yellow-200 font-semibold leading-5 text-yellow-800">
                        Pending
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-2 px-4 sm:px-6 lg:px-8">
                <h4 className="sr-only">Status</h4>
                <p className="text-sm font-medium text-gray-900">
                  Expected completion on{" "}
                  <time className="font-medium text-gray-900">
                    {dayjs(booking.createdAt)
                      .add(booking.offeredService.duration, "day")
                      .format("MMMM D, YYYY")}
                  </time>
                </p>
                <div className="mt-6" aria-hidden="true">
                  <div className="bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-indigo-600 rounded-full"
                      style={{
                        width: `calc((${products[0].step} * 2 + 1) / 8 * 100%)`,
                      }}
                    />
                  </div>
                  <div className="hidden sm:grid grid-cols-4 text-sm font-medium text-gray-600 mt-6">
                    <div className="text-indigo-600">Booking placed</div>
                    <div
                      className={classNames(
                        products[0].step > 0 ? "text-indigo-600" : "",
                        "text-center"
                      )}
                    >
                      Accepted
                    </div>
                    <div
                      className={classNames(
                        products[0].step > 1 ? "text-indigo-600" : "",
                        "text-center"
                      )}
                    >
                      Processing
                    </div>
                    <div
                      className={classNames(
                        products[0].step > 2 ? "text-indigo-600" : "",
                        "text-right"
                      )}
                    >
                      Success
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 py-2 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
                <div className="bg-blue-300 sm:flex lg:col-span-6">
                  <div className="flex-shrink-0 w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-none sm:w-40 sm:h-40">
                    <img
                      src={booking.offeredService.paperMaker.user.picture}
                      alt="Papermaker Image"
                      className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                    />
                  </div>
                  <div className="mt-6 sm:mt-0 sm:ml-6">
                    <h3 className="text-base font-medium text-gray-900">
                      {booking.offeredService.paperMaker.user.name}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-gray-900">
                      ${booking.payAmount}
                    </p>
                    <p className="mt-3 text-sm text-gray-600">
                      Booking placed{" "}
                      <time className="font-medium text-gray-900">
                        {dayjs(booking.createdAt).format("MMMM D, YYYY")}
                      </time>
                    </p>
                    <p className="mt-3 text-sm text-gray-600">
                      Service:{" "}
                      <span className="inline-block font-medium text-gray-900">
                        {booking.offeredService.service.name}{" "}
                      </span>
                    </p>
                    <p className="mt-3 text-sm text-gray-600">
                      Duration:{" "}
                      <span className="inline-block font-medium text-gray-900">
                        {booking.offeredService.duration}{" "}
                      </span>{" "}
                      days
                    </p>
                  </div>
                </div>
                <div className="bg-yellow-300 sm:flex lg:col-span-3">
                  <h3 className="text-base font-medium text-gray-900">
                    Papermaker address
                  </h3>
                  <p className="mt-2 text-sm font-medium text-gray-900"></p>
                </div>
                <div className="bg-red-300 sm:flex lg:col-span-3"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Billing */}
        <div className="mt-16">
          <h2 className="sr-only">Billing Summary</h2>

          <div className="bg-gray-100 py-6 px-4 sm:px-6 sm:rounded-lg lg:px-8 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
            <dl className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-1 md:gap-x-8 lg:col-span-7">
              <div>
                <dt className="font-medium text-gray-900">Note</dt>
                <dd className="mt-3 text-gray-500">
                  <span className="block">{booking.note}</span>
                </dd>
              </div>
            </dl>

            <dl className="mt-8 divide-y divide-gray-200 text-sm lg:mt-0 lg:col-span-5">
              <div className="pb-4 flex items-center justify-between">
                <dt className="text-gray-600">Subtotal</dt>
                <dd className="font-medium text-gray-900">
                  ${booking.payAmount}
                </dd>
              </div>
              <div className="py-4 flex items-center justify-between">
                <dt className="text-gray-600">Tax</dt>
                <dd className="font-medium text-gray-900">$0</dd>
              </div>
              <div className="pt-4 flex items-center justify-between">
                <dt className="font-medium text-gray-900">Order total</dt>
                <dd className="font-medium text-indigo-600">
                  ${booking.payAmount}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
