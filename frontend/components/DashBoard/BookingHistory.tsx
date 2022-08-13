/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { CheckCircleIcon } from '@heroicons/react/solid'

const orders = [
  {
    number: 'WU88191111',
    href: '#',
    invoiceHref: '#',
    createdDate: 'Jul 6, 2021',
    createdDatetime: '2021-07-06',
    deliveredDate: 'July 12, 2021',
    deliveredDatetime: '2021-07-12',
    total: '$70.00',
    products: [
      {
        id: 1,
        name: 'Nguyen Dang Lam Phuong',
        description:
          'Marriage Certificate',
        href: '#',
        price: '$70.00',
        imageSrc: 'data:image/jpeg;base64,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',
        imageAlt:
          'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
      },
      // More products...
    ],
  },
  // More orders...
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function BookingHistory() {
  return (
    <div
    className="divide-y divide-gray-200 lg:col-span-9"
  >
    <div className="py-2 sm:py-2">
      <div className="mt-5 mb-5">
        <h2 className="sr-only">Recent orders</h2>
        <div className="max-w-full mx-auto sm:px-2 lg:px-8">
          <div className="lg:col-span-1 lg:flex lg:items-center lg:space-x-0">
            {orders.map((order) => (
              <div
                key={order.number}
                className="bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border"
              >
                <h3 className="sr-only">
                  Order placed on <time dateTime={order.createdDatetime}>{order.createdDate}</time>
                </h3>

                <div className="flex items-center p-4 border-b border-gray-200 sm:p-6 sm:grid sm:grid-cols-4 sm:gap-x-6">
                  <dl className="flex-1 grid grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                    <div>
                      <dt className="font-medium text-gray-900">Booking number</dt>
                      <dd className="mt-1 text-gray-500">{order.number}</dd>
                    </div>
                    <div className="hidden sm:block">
                      <dt className="font-medium text-gray-900">Date booked</dt>
                      <dd className="mt-1 text-gray-500">
                        <time dateTime={order.createdDatetime}>{order.createdDate}</time>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-900">Total amount</dt>
                      <dd className="mt-1 font-medium text-gray-900">{order.total}</dd>
                    </div>
                  </dl>
                  <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                    <a
                      href={order.href}
                      className="flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span>View Booking</span>
                      <span className="sr-only">{order.number}</span>
                    </a>
                    <a
                      href={order.invoiceHref}
                      className="flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span>View Invoice</span>
                      <span className="sr-only">for order {order.number}</span>
                    </a>
                  </div>
                </div>

                {/* Products */}
                <h4 className="sr-only">Items</h4>
                <ul role="list" className="divide-y divide-gray-200">
                  {order.products.map((product) => (
                    <li key={product.id} className="p-4 sm:p-6">
                      <div className="flex items-center sm:items-start">
                        <div className="flex-shrink-0 w-30 h-20 bg-gray-200 rounded-lg overflow-hidden sm:w-30 sm:h-20">
                          <img
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="flex-1 ml-6 text-sm">
                          <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                            <h5>{product.name}</h5>
                            <p className="mt-2 sm:mt-0">{product.price}</p>
                          </div>
                          <p className="hidden text-gray-500 sm:block sm:mt-2">{product.description}</p>
                        </div>
                      </div>

                      <div className="mt-6 sm:flex sm:justify-between">
                        <div className="flex items-center">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" aria-hidden="true" />
                          <p className="ml-2 text-sm font-medium text-gray-500">
                            Finished on <time dateTime={order.deliveredDatetime}>{order.deliveredDate}</time>
                          </p>
                        </div>

                        <div className="mt-6 border-t border-gray-200 pt-4 flex items-center space-x-4 divide-x divide-gray-200 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
                          <div className="flex-1 flex justify-center">
                            <a
                              href={product.href}
                              className="text-indigo-600 whitespace-nowrap hover:text-indigo-500"
                            >
                              View papermaker
                            </a>
                          </div>
                          <div className="flex-1 pl-4 flex justify-center">
                            <a href="#" className="text-indigo-600 whitespace-nowrap hover:text-indigo-500">
                              Book again
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
   
    </div>

  </div>
  )
}
