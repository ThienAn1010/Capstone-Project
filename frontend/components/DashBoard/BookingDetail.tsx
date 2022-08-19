import dayjs from "dayjs"
import { CheckIcon } from "@heroicons/react/solid"

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

const steps = [
  {
    name: "Order Booked",
    description: "Successfully booked the order",
    href: "#",
    status: "complete",
  },
  {
    name: "Order Accepted",
    description: "Your order has been confirmed by our papermaker",
    href: "#",
    status: "complete",
  },
  {
    name: "Order In Progress",
    description: "We are working on your order",
    href: "#",
    status: "current",
  },
  {
    name: "Paperwork Pickup",
    description: "You paperwork is ready to be picked up",
    href: "#",
    status: "upcoming",
  },
  {
    name: "Order Finished",
    description: "We have finished your order",
    href: "#",
    status: "upcoming",
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function BookingDetail({ booking }: any) {
  return (
    <div className="bg-checkout pb-12">
      <div className="max-w-2xl mx-auto pt-16 sm:py-2 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* Products */}
        <div className="mt-6">
          <h2 className="sr-only">Products purchased</h2>
          <div className="space-y-8">
            <div className="bg-white border-t border-b border-gray-200 shadow-sm sm:border sm:rounded-t-lg">
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
                      className="h-2 bg-blue-600 rounded-full"
                      style={{
                        width: `calc((${products[0].step} * 2 + 1) / 8 * 100%)`,
                      }}
                    />
                  </div>
                  <div className="hidden sm:grid grid-cols-4 text-sm font-medium text-gray-600 mt-6">
                    <div className="text-blue-600">Booking placed</div>
                    <div
                      className={classNames(
                        products[0].step > 0 ? "text-blue-600" : "",
                        "text-center"
                      )}
                    >
                      Accepted
                    </div>
                    <div
                      className={classNames(
                        products[0].step > 1 ? "text-blue-600" : "",
                        "text-center"
                      )}
                    >
                      Processing
                    </div>
                    <div
                      className={classNames(
                        products[0].step > 2 ? "text-blue-600" : "",
                        "text-right"
                      )}
                    >
                      Success
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-b-2 pb-6 mt-8 py-2 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
                <div className="sm:flex lg:col-span-5">
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
                <div className="lg:col-span-4">
                  <h3 className="text-base font-medium text-gray-900">
                    Papermaker Address
                  </h3>
                  <p className="mt-3 text-sm text-gray-600">
                    {booking.offeredService.paperMaker.user.address}
                  </p>
                </div>
                <div className="lg:col-span-3">
                  <h3 className="text-base font-medium text-gray-900">
                    Contact Details
                  </h3>

                  <p className="mt-3 text-sm text-gray-600">
                    Email:{" "}
                    <span className="inline-block font-medium text-gray-900">
                      {booking.offeredService.paperMaker.user.username}
                    </span>
                  </p>
                  <p className="mt-3 text-sm text-gray-600">
                    Phone:{" "}
                    <span className="inline-block font-medium text-gray-900">
                      {booking.offeredService.paperMaker.user.phoneNumber}
                    </span>
                  </p>
                </div>
              </div>
              <div className="px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
                <div className="pt-4 border-r-2 sm:flex lg:col-span-6">
                  <div className="mt-6 sm:mt-0 sm:ml-6">
                    <h3 className="text-base font-medium text-gray-900">
                      User&apos;s Information
                    </h3>
                    <p className="mt-3 text-sm font-medium text-gray-900">
                      {booking.user.name}
                    </p>
                    <p className="mt-3 text-sm text-gray-600">
                      {booking.user.username}
                    </p>
                    <p className="mt-3 text-sm text-gray-600">
                      {booking.user.phoneNumber}
                    </p>
                    <p className="mt-3 text-sm text-gray-600">
                      {booking.user.address}
                    </p>
                  </div>
                </div>
                <div className="sm:flex lg:col-span-6">
                  <div className="py-4 px-4">
                    <nav aria-label="Progress">
                      <ol role="list" className="overflow-hidden">
                        {steps.map((step, stepIdx) => (
                          <li
                            key={step.name}
                            className={classNames(
                              stepIdx !== steps.length - 1 ? "pb-10" : "",
                              "relative"
                            )}
                          >
                            {step.status === "complete" ? (
                              <>
                                {stepIdx !== steps.length - 1 ? (
                                  <div
                                    className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-blue-600"
                                    aria-hidden="true"
                                  />
                                ) : null}
                                <p className="relative flex items-start group">
                                  <span className="h-9 flex items-center">
                                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-blue-600 rounded-full group-hover:bg-blue-800">
                                      <CheckIcon
                                        className="w-5 h-5 text-white"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </span>
                                  <span className="ml-4 min-w-0 flex flex-col">
                                    <span className="text-xs font-semibold tracking-wide uppercase">
                                      {step.name}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                      {step.description}
                                    </span>
                                  </span>
                                </p>
                              </>
                            ) : step.status === "current" ? (
                              <>
                                {stepIdx !== steps.length - 1 ? (
                                  <div
                                    className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                                    aria-hidden="true"
                                  />
                                ) : null}
                                <a
                                  href={step.href}
                                  className="relative flex items-start group"
                                  aria-current="step"
                                >
                                  <span
                                    className="h-9 flex items-center"
                                    aria-hidden="true"
                                  >
                                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-blue-600 rounded-full">
                                      <span className="h-2.5 w-2.5 bg-blue-600 rounded-full" />
                                    </span>
                                  </span>
                                  <span className="ml-4 min-w-0 flex flex-col">
                                    <span className="text-xs font-semibold tracking-wide uppercase text-blue-600">
                                      {step.name}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                      {step.description}
                                    </span>
                                  </span>
                                </a>
                              </>
                            ) : (
                              <>
                                {stepIdx !== steps.length - 1 ? (
                                  <div
                                    className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                                    aria-hidden="true"
                                  />
                                ) : null}
                                <a
                                  href={step.href}
                                  className="relative flex items-start group"
                                >
                                  <span
                                    className="h-9 flex items-center"
                                    aria-hidden="true"
                                  >
                                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                                      <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
                                    </span>
                                  </span>
                                  <span className="ml-4 min-w-0 flex flex-col">
                                    <span className="text-xs font-semibold tracking-wide uppercase text-gray-500">
                                      {step.name}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                      {step.description}
                                    </span>
                                  </span>
                                </a>
                              </>
                            )}
                          </li>
                        ))}
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Billing */}
        <div>
          <h2 className="sr-only">Billing Summary</h2>
          <div className=" bg-gray-100 sm:border py-6 px-4 sm:px-6 sm:rounded-b-lg lg:px-8 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
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
                <dd className="font-medium text-blue-600">
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
