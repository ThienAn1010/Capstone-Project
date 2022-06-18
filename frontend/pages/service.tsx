import type { NextPage } from "next"
import { GetServerSideProps } from "next"
import Head from "next/head"
import NavBarNoLog from "../components/navbar/NavBarNoLog"
import { Fragment, useState } from "react"
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react"
import { XIcon } from "@heroicons/react/outline"
import {
  ChevronDownIcon,
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
  ViewGridIcon,
} from "@heroicons/react/solid"
import Card from "../components/Card"
import Pagination from "../components/Pagination"
import axiosInstance from "../util/axiosInstace"
import useSWR from "swr"
import CardLoader from "../components/CardLoader"
import Star from "../components/Star"

const sortOptions = [
  { name: "Newest", value: "" },
  { name: "Most Popular", value: "sort=-totalCases" },
  { name: "Shortest Duration", value: "sort=duration" },
  { name: "Highest Rating", value: "sort=-rating" },
  { name: "Price: Low to High", value: "sort=price" },
  { name: "Price: High to Low", value: "sort=-price" },
]
const subCategories = [
  { name: "Totes", href: "#" },
  { name: "Backpacks", href: "#" },
  { name: "Travel Bags", href: "#" },
  { name: "Hip Bags", href: "#" },
  { name: "Laptop Sleeves", href: "#" },
]
const filters = [
  {
    id: "rating",
    name: "Ratings",
    options: [
      { value: 5, label: "5 star", checked: false },
      { value: 4, label: "4.0 star & up", checked: false },
      { value: 3, label: "3.0 star & up", checked: true },
      { value: 2, label: "2.0 star & up", checked: false },
      { value: 1, label: "1.0 star & up", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "duration",
    name: "Duration",
    options: [
      { value: 7, label: "5-7 days", checked: false },
      { value: 14, label: "7-14 days", checked: false },
      { value: 15, label: "15+ days", checked: false },
    ],
  },
  {
    id: "price",
    name: "Price",
    options: [
      { value: "10", label: "$10-$50", checked: false },
      { value: "50", label: "$50-$100", checked: false },
      { value: "100", label: "$100+", checked: false },
    ],
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export interface OfferedService {
  createdAt: string
  duration: number
  id: string
  paperMaker: {
    address: string
    id: string
    isConfirmed: boolean
    lat: number
    long: number
    pastSuccessfulCases: number
    rating: number
    status: string
    totalCases: 0
    user: {
      name: string
      picture: string
      username: string
    }
  }
  paperMakerId: string
  price: number
  service: Service
  serviceId: string
}

interface Service {
  id: string
  name: string
  description: string
}

interface ServicePageProps {
  offeredServices: OfferedService[]
  services: Service[]
}

const key = "/offered-services"

const ServicePage: NextPage<ServicePageProps> = ({
  offeredServices,
  services,
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [sort, setSort] = useState(sortOptions[0])
  const [filter, setFilter] = useState({
    rating: "",
    categories: "",
    duration: "",
    price: 0,
  })
  console.log({ filter, setFilter })

  const criteria = key + "?" + sort.value
  console.log(criteria)
  const { data, error } = useSWR(
    criteria === "/offered-services?" ? null : criteria,
    (url) =>
      axiosInstance
        .get<{ offeredServices: OfferedService[] }>(url)
        .then((response) => response.data.offeredServices),
    {
      fallbackData: criteria === "/offered-services?" ? offeredServices : null,
    }
  )

  return (
    <>
      <Head>
        <title>Service</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBarNoLog />

      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="font-medium text-gray-900 px-2 py-3"
                  >
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a href={category.href} className="block px-2 py-3">
                          {category.name}
                        </a>
                      </li>
                    ))}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 flex items-baseline justify-between pt-12 pb-6 border-b border-gray-200">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {sort.name}
          </h1>
          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
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
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.value}>
                        {({ active }) => (
                          <button
                            onClick={() => setSort(option)}
                            className={classNames(
                              option.value === sort.value
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm w-full text-left"
                            )}
                          >
                            {option.name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">View grid</span>
              <ViewGridIcon className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FilterIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10 lg:items-baseline">
            {/* Filters */}
            <form className="hidden lg:block mb-auto">
              <h3 className="sr-only">Categories</h3>

              {filters.map((section) => (
                <Disclosure
                  as="div"
                  key={section.id}
                  className="border-b border-gray-200 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusSmIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusSmIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          {section.id === "rating" &&
                            section.options.map((section) => (
                              <div
                                key={section.label}
                                className="flex items-center"
                              >
                                <input
                                  id={section.label}
                                  name="notification-method"
                                  type="radio"
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                />
                                <label
                                  htmlFor={section.label}
                                  className="ml-3 text-sm flex items-center gap-x-1"
                                >
                                  <Star rating={section.value as number} />
                                  <span>{section.label}</span>
                                </label>
                              </div>
                            ))}
                          {section.id === "category" &&
                            services.map((service) => (
                              <div
                                key={service.id}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${service.id}-${service.name}`}
                                  name={`${service.id}[]`}
                                  defaultValue={service.id}
                                  type="checkbox"
                                  defaultChecked={
                                    service.id === filter.categories
                                  }
                                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${service.id}-${service.name}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {service.name}
                                </label>
                              </div>
                            ))}
                          {(section.id === "duration" ||
                            section.id === "price") &&
                            section.options.map((section) => (
                              <div
                                key={section.label}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.value}-${section.label}`}
                                  name={`${section.label}[]`}
                                  defaultValue={section.value}
                                  type="checkbox"
                                  defaultChecked={
                                    section.value === filter.duration
                                  }
                                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.value}-${section.label}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {section.label}
                                </label>
                              </div>
                            ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>

            {/* Product grid */}
            <div className="grid grid-cols-1 gap-y-5 gap-x-6 lg:col-span-3 lg:gap-x-5">
              {!data &&
                !error &&
                Array(3)
                  .fill(3)
                  .map((_, index) => <CardLoader key={index} />)}
              {data?.map((offeredService) => (
                <Card key={offeredService.id} offeredService={offeredService} />
              ))}
              <Pagination />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default ServicePage

export const getServerSideProps: GetServerSideProps = async () => {
  const requestOfferedServices = axiosInstance.get("/offered-services")
  const requestServices = axiosInstance.get("/services")
  const response = await Promise.all([requestOfferedServices, requestServices])
  const offeredServices = response[0].data.offeredServices
  const services = response[1].data.services
  console.log(offeredServices, services)
  return { props: { offeredServices, services } }
}
