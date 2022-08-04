import { Fragment } from "react"
import { Popover } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import axiosInstance from "../../util/axiosInstace"
import useGetMe from "../../hooks/useGetMe"
import SearchBar from "./SearchBar"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function NavBarLog({ data }: any) {
  const { mutate } = useGetMe()

  const handleLogout = () => {
    mutate(() => axiosInstance.post("/auth/logout").then(() => undefined), {
      optimisticData: undefined,
    })
  }
  console.log(data.picture)
  return (
    <>
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? "fixed inset-0 z-40 overflow-y-auto" : "",
            "bg-test shadow-md lg:static lg:overflow-y-visible"
          )
        }
      >
        {({ open }) => (
          <>
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-6">
                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-1">
                  <div className="flex-shrink-0 flex items-center">
                    <a href="#">
                      <img
                        className="block h-8 w-auto lg:hidden"
                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=blue"
                        alt="Workflow"
                      />
                    </a>
                    <a href="#">
                      <img
                        className="hidden lg:block h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                        alt="Workflow"
                      />
                    </a>
                  </div>
                </div>
                <div className="hidden lg:flex lg:items-center lg:justify-center xl:col-span-1">
                  <p className="text-md subpixel-antialiased text-white font-medium cursor-pointer transition duration-150 border-b border-transparent hover:border-white">
                    CATEGORIES
                  </p>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                  <SearchBar />
                </div>
                <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XIcon
                        className="block h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    ) : (
                      <MenuIcon
                        className="block h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    )}
                  </Popover.Button>
                </div>
                <div className="hidden lg:flex lg:divide-x lg:divide-gray-100 lg:items-center lg:justify-end xl:col-span-4">
                  <div className="px-4">
                    <p className="text-md subpixel-antialiased font-medium border-b border-transparent text-white hover:cursor-pointer hover:border-white">
                      BECOME A PAPERMAKER
                    </p>
                  </div>
                  <div className="hidden space-x-2 pl-4 lg:flex lg:items-center lg:justify-end">
                    {/* <div className="items-center justify-center hover:cursor-pointer">
                      <svg
                        fill="currentColor"
                        className="h-8 w-8"
                        stroke="unset"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                      >
                        <defs>
                          <rect
                            x="6"
                            y="13"
                            width="36.7659574"
                            height="21.7358491"
                            id="rect-1"
                          ></rect>
                        </defs>
                        <g
                          id="icons/icon-menu/icon-lang-vn"
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <g id="Bitmap">
                            <image
                              x="6"
                              y="13"
                              width="36.7659574"
                              height="21.7358491"
                              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAeCAYAAAC8AUekAAAABGdBTUEAALGOfPtRkwAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAL6ADAAQAAAABAAAAHgAAAAB0FVfBAAADG0lEQVRYCe2WyWsUQRTGv1e9JDPZo+QQjBtGwXjwpKigd/Gs/6FXwYN/gBEvohLwEiTEuKBZNPtkpru6y6+6Z5h2SCTTCyGQgp7qqXpd9Xtfvfe6ZffZXYNT2tQp5U6wz+BP6vSqU95mUsXZ5FaiGiWRUa4s5N9mH1eyC8pXnmrLgMCZ43XL3nOgohOoRvkBwLk9CHGA6FMTaFRDXwm81AVqtk4PqPxQC2azGvhyw4aMUjNQV9mP+5ARH841ScaqCJ388ExGm5D/XDYvhwXunAcoTvJSNz0Ix5LWa98eTif7/80VNuKTeZIys4fphoSwqsg0YW8METyFUdfrUFdCiB/CZKUSkgd8/I/AsM/TcsGbkGwzAu/hMGRqMC2FHSd8hsl5Kt8Re3IA/tMJAradtNB0wqw3oef3ode6zvfrQC54G7/xF0CPtOA9ciGzNbIqDrdBsjwOYacZ/ySjW7SIYT4fQH9sIV62C/WL3LXPB8/nzSrL4FYAsxbDfRCyNLK6jDGOOifQ3YNj/EPFzU6AaKEB/aaJeFHDNNNTyJr2c58bPjn6QKAXIpiNfZZDDffOMFVmkc8qb2nIaH42Eb3bg35Nxb/bsWLgdtlsCtn//TXun7yIvjGEqGa03Djy+fgrQ2WeNis0sbvy2aItv/KZnYUwMuJAzrWXOwRMTTI3RmmjCgR5Zk97Wwq8VVFNuVAXa2nIhEzLLZ1spca5hcdUnanRpoVItXoQ8v8tDs/4lnEDucBvgTqX249YiZoIX+6QysB7Mso3Lp0aclheqfwEa9ImvT3kdPp1ozg8o0BNs1BeJvy2RvR2B8Erfs9spVkb/9iF/7gF5/4Y5JKirUL0m3M0L9oKwxsLP8USyVAJn29Af6Cy9isyZU8+yoIXAZzlDbj3bOh40HGQJPqJw9tPhWgpQLzKa4XgBz0hYf3YM4jex4jXG3SMEcNqWuTl1HG6sPJ2oXiVhL94o3vAO7tw2DpllmhnY719Kp3pvH1xeAtioW1vwY5qdi46ajLfeLGXVHbP/4Fn7Uq8Lw++RKjjLnUGf1ylyrY71cr/BSy59FsLOQsYAAAAAElFTkSuQmCC"
                            ></image>
                            <use
                              stroke="#FFFFFF"
                              strokeWidth="0.5"
                              href="#rect-1"
                            ></use>
                          </g>
                        </g>
                      </svg>
                    </div> */}
                    <Menu as="div" className="inline-flex items-center">
                      <div>
                        <Menu.Button className="inline-flex justify-center items-center w-full rounded-md border border-white shadow-sm px-2 py-2 text-md font-medium text-white hover:border-2">
                          <img
                            className="mr-2 h-7 w-7 rounded-full"
                            alt="User Avatar"
                            src={data.picture}
                          />
                          <p>{data.name}</p>
                          <ChevronDownIcon
                            className="-mr-1 ml-2 mt-0.5 h-5 w-5"
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
                        <Menu.Items className="block absolute z-10 top-16 right-0 mt-2 w-64 border border-grey-200 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                          <div>
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-black"
                                      : "text-gray-900",
                                    "flex justify-start space-x-2 items-center px-4 py-4 hover:cursor-pointer"
                                  )}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-7 w-7"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                                    />
                                  </svg>
                                  <a
                                    href="#"
                                    className="block text-md font-medium"
                                  >
                                    Dashboard
                                  </a>
                                </div>
                              )}
                            </Menu.Item>
                          </div>
                          <div>
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-black"
                                      : "text-gray-900",
                                    "flex justify-start space-x-2 items-center px-4 py-4 hover:cursor-pointer"
                                  )}
                                >
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
                                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                    />
                                  </svg>
                                  <a
                                    href="#"
                                    className="block text-md font-medium"
                                  >
                                    My Order
                                  </a>
                                </div>
                              )}
                            </Menu.Item>
                          </div>
                          <div>
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-black"
                                      : "text-gray-900",
                                    "flex justify-start space-x-2 items-center px-4 py-4 hover:cursor-pointer"
                                  )}
                                  onClick={handleLogout}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-7 w-7"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                    />
                                  </svg>
                                  <a
                                    href="#"
                                    className="block text-md font-medium"
                                  >
                                    Sign Out
                                  </a>
                                </div>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
            <Popover.Panel
              as="nav"
              className="bg-white lg:hidden"
              aria-label="Global"
            >
              <div className="border-gray-300 flex justify-center space-x-2 py-4 items-center hover:cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
                <p className="text-md font-medium">Dashboard</p>
              </div>
              <div className="border-t-2 border-gray-300 flex justify-center space-x-2 py-4 items-center hover:cursor-pointer">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
                <p className="text-md font-medium">My Order</p>
              </div>

              <div className="border-t-2 border-gray-300">
                <div className="flex justify-center space-x-2 items-center py-4 hover:cursor-pointer">
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
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <p className="text-md font-medium">Categories</p>
                </div>
                <div className="border-t-2 border-gray-300 flex justify-center space-x-2 py-4 items-center hover:cursor-pointer">
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <p className="text-md font-medium">Become a papermaker</p>
                </div>
                <div className="border-t-2 border-gray-300 flex justify-center space-x-2 py-4 items-center hover:cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <p className="text-md font-medium">Sign Out</p>
                </div>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </>
  )
}