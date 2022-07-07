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
import CardLoader from "../components/CardLoader"
import Star from "../components/Star"
import { useRouter } from "next/router"
import useGetOfferedServices from "../hooks/useGetOfferedServices"
import { Service } from "../types/Service"
import { OfferedService } from "../types/OfferedService"

const sortOptions = [
  { name: "Newest", value: "-createdAt" },
  { name: "Most Popular", value: "-totalCases" },
  { name: "Shortest Duration", value: "duration" },
  { name: "Highest Rating", value: "-rating" },
  { name: "Price: Low to High", value: "price" },
  { name: "Price: High to Low", value: "-price" },
]

const filters = [
  {
    id: "rating",
    name: "Ratings",
    type: "radio",
    options: [
      { value: "5", label: "5 star" },
      { value: "4", label: "4.0 star & up" },
      { value: "3", label: "3.0 star & up" },
      { value: "2", label: "2.0 star & up" },
      { value: "1", label: "1.0 star & up" },
    ],
  },
  {
    id: "category",
    name: "Category",
    type: "checkbox",
    options: [],
  },
  {
    id: "duration",
    name: "Duration",
    type: "radio",
    options: [
      { value: "7", label: "Less than 7 days" },
      { value: "14", label: "Less than 14 days" },
      { value: "15", label: "More than 15 days" },
    ],
  },
  {
    id: "price",
    name: "Price",
    type: "radio",
    options: [
      { value: "50", label: "Less than $50" },
      { value: "99", label: "Less than $99" },
      { value: "100", label: "More than $100" },
    ],
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

interface ServicePageProps {
  offeredServicesData: {
    offeredServices: OfferedService[]
    length: number
    numberOfRecords: number
  }
  services: Service[]
}

const key = "/offered-services"

const ServicePage: NextPage<ServicePageProps> = ({
  offeredServicesData,
  services,
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const router = useRouter()
  const searchParams = router.asPath.indexOf("?") + 1
  const url = router.asPath.includes("?")
    ? router.asPath.slice(searchParams)
    : ""
  const criteria = key + "?" + url
  const { data, isLoading } = useGetOfferedServices(
    criteria,
    offeredServicesData
  )
  console.log(router.query)
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
                              {section.id === "rating" &&
                                section.options.map((s) => (
                                  <div
                                    key={s.label}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={s.label}
                                      name="notification-method"
                                      type="radio"
                                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                      onChange={() => {
                                        const query = { ...router.query }
                                        delete query.page
                                        router.replace(
                                          {
                                            query: {
                                              ...query,
                                              [`${section.id}[gte]`]: s.value,
                                            },
                                          },
                                          undefined,
                                          {
                                            shallow: true,
                                          }
                                        )
                                      }}
                                    />
                                    <label
                                      htmlFor={s.label}
                                      className="flex items-center gap-x-1 ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      <Star rating={parseInt(s.value)} />
                                      <span>{s.label}</span>
                                    </label>
                                  </div>
                                ))}
                              {section.id === "category" &&
                                services.map((s) => (
                                  <div key={s.id} className="flex items-center">
                                    <input
                                      id={`filter-${s.id}-${s.name}`}
                                      name={`${s.id}[]`}
                                      type="checkbox"
                                      className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                      onChange={() => {
                                        const queryServiceId =
                                          router.query.serviceId
                                        const query = {
                                          ...router.query,
                                          serviceId: !queryServiceId
                                            ? s.id
                                            : queryServiceId.includes(s.id)
                                            ? typeof queryServiceId === "string"
                                              ? "delete"
                                              : queryServiceId.filter(
                                                  (id) => id !== s.id
                                                )
                                            : [
                                                ...(queryServiceId as string[]),
                                                s.id,
                                              ],
                                        } as any
                                        if (query.serviceId === "delete") {
                                          delete query.serviceId
                                        }
                                        delete query.page
                                        router.replace({ query }, undefined, {
                                          shallow: true,
                                        })
                                      }}
                                    />
                                    <label
                                      htmlFor={`filter-${s.id}-${s.name}`}
                                      className="ml-3 text-sm text-gray-600"
                                    >
                                      {s.name}
                                    </label>
                                  </div>
                                ))}
                              {(section.id === "duration" ||
                                section.id === "price") &&
                                section.options.map((s) => (
                                  <div
                                    key={s.label}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-${s.value}-${s.label}`}
                                      defaultValue={s.value}
                                      name={`${section.id}-group`}
                                      type="radio"
                                      className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                      onChange={() => {
                                        const value =
                                          (s.value === "15" &&
                                            section.id === "duration") ||
                                          (s.value === "100" &&
                                            section.id === "price")
                                            ? "[gte]"
                                            : "[lte]"
                                        const query = { ...router.query }
                                        delete query.page
                                        router.replace(
                                          {
                                            query: {
                                              ...query,
                                              [`${section.id}${value}`]:
                                                s.value,
                                            },
                                          },
                                          undefined,
                                          {
                                            shallow: true,
                                          }
                                        )
                                      }}
                                    />
                                    <label
                                      htmlFor={`filter-${s.value}-${s.label}`}
                                      className="ml-3 text-sm text-gray-600"
                                    >
                                      {s.label}
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
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
            {isLoading ? "Loading..." : `${data?.numberOfRecords} results`}
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
                            onClick={async () => {
                              const query = { ...router.query }
                              delete query.page
                              await router.replace(
                                {
                                  query: {
                                    ...query,
                                    sort: option.value,
                                  },
                                },
                                undefined,
                                { shallow: true }
                              )
                            }}
                            className={classNames(
                              option.value === router.query.sort
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
                            section.options.map((s) => (
                              <div key={s.label} className="flex items-center">
                                <input
                                  id={s.label}
                                  name="notification-method"
                                  type="radio"
                                  defaultChecked={
                                    s.value ===
                                    `${router.query[`${section.id}[gte]`]}`
                                  }
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                  onChange={() => {
                                    const query = { ...router.query }
                                    delete query.page
                                    router.replace(
                                      {
                                        query: {
                                          ...query,
                                          [`${section.id}[gte]`]: s.value,
                                        },
                                      },
                                      undefined,
                                      {
                                        shallow: true,
                                      }
                                    )
                                  }}
                                />
                                <label
                                  htmlFor={s.label}
                                  className="ml-3 text-sm flex items-center gap-x-1"
                                >
                                  <Star rating={parseInt(s.value)} />
                                  <span>{s.label}</span>
                                </label>
                              </div>
                            ))}
                          {section.id === "category" &&
                            services.map((s) => (
                              <div key={s.id} className="flex items-center">
                                <input
                                  id={`filter-${s.id}-${s.name}`}
                                  name={`${s.id}[]`}
                                  type="checkbox"
                                  defaultChecked={router.query.serviceId?.includes(
                                    s.id
                                  )}
                                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  onChange={() => {
                                    const queryServiceId =
                                      router.query.serviceId
                                    const query = {
                                      ...router.query,
                                      serviceId: !queryServiceId
                                        ? s.id
                                        : queryServiceId.includes(s.id)
                                        ? typeof queryServiceId === "string"
                                          ? "delete"
                                          : queryServiceId.filter(
                                              (id) => id !== s.id
                                            )
                                        : [
                                            ...(queryServiceId as string[]),
                                            s.id,
                                          ],
                                    } as any
                                    if (query.serviceId === "delete") {
                                      delete query.serviceId
                                    }
                                    delete query.page
                                    router.replace({ query }, undefined, {
                                      shallow: true,
                                    })
                                  }}
                                />
                                <label
                                  htmlFor={`filter-${s.id}-${s.name}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {s.name}
                                </label>
                              </div>
                            ))}
                          {(section.id === "duration" ||
                            section.id === "price") &&
                            section.options.map((s) => (
                              <div key={s.label} className="flex items-center">
                                <input
                                  id={`filter-${s.value}-${s.label}`}
                                  defaultValue={s.value}
                                  name={`${section.id}-group`}
                                  type="radio"
                                  defaultChecked={(() => {
                                    const value =
                                      (s.value === "15" &&
                                        section.id === "duration") ||
                                      (s.value === "100" &&
                                        section.id === "price")
                                        ? "[gte]"
                                        : "[lte]"
                                    return (
                                      s.value ===
                                      router.query[`${section.id}${value}`]
                                    )
                                  })()}
                                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  onChange={() => {
                                    const value =
                                      (s.value === "15" &&
                                        section.id === "duration") ||
                                      (s.value === "100" &&
                                        section.id === "price")
                                        ? "[gte]"
                                        : "[lte]"
                                    const query = { ...router.query }
                                    delete query.page
                                    delete query[`${section.id}[gte]`]
                                    delete query[`${section.id}[lte]`]
                                    router.replace(
                                      {
                                        query: {
                                          ...query,
                                          [`${section.id}${value}`]: s.value,
                                        },
                                      },
                                      undefined,
                                      {
                                        shallow: true,
                                      }
                                    )
                                  }}
                                />
                                <label
                                  htmlFor={`filter-${s.value}-${s.label}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {s.label}
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
              {isLoading &&
                Array(3)
                  .fill(3)
                  .map((_, index) => <CardLoader key={index} />)}
              {data?.numberOfRecords === 0 && (
                <h4 className="text-center">No results found</h4>
              )}
              {data?.offeredServices.map((offeredService) => (
                <Card key={offeredService.id} offeredService={offeredService} />
              ))}
              {!(
                isLoading ||
                data?.numberOfRecords === 0 ||
                data?.length === 0
              ) && (
                <Pagination
                  pageSize={10}
                  numberOfRecords={data!.numberOfRecords}
                />
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default ServicePage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryString = context.resolvedUrl.includes("?")
    ? "offered-services" +
      context.resolvedUrl.slice(context.resolvedUrl.indexOf("?"))
    : "offered-services"
  const requestOfferedServices = axiosInstance.get(queryString)
  const requestServices = axiosInstance.get("/services")
  const response = await Promise.all([requestOfferedServices, requestServices])
  const offeredServices = response[0].data.offeredServices
  const services = response[1].data.services
  const offeredServicesData = {
    offeredServices,
    length: response[0].data.length,
    numberOfRecords: response[0].data.numberOfRecords,
  }
  return {
    props: { offeredServicesData, services },
  }
}
