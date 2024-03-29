import { Fragment } from "react"
import { Popover } from "@headlessui/react"
import { MenuIcon, XIcon, UserIcon } from "@heroicons/react/outline"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import Link from "next/link"
import NavFacebookButton from "../LoginButton/NavFacebookButton"
import NavGoogleButton from "../LoginButton/NavGoogleButton"
import SearchBar from "./SearchBar"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function NavBarNoLog() {
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
                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-1 ">
                  <div className="flex-shrink-0 flex items-center">
                    <Link href="/">
                      <img
                        className="block justify-center h-9  w-auto lg:hidden "
                        src="/mobile_logo.png"
                        alt="mobile_logo"
                      />
                    </Link>
                    <Link href="/">
                      <img
                        className="hidden justify-center lg:block h-6 w-auto hover:cursor-pointer"
                        src="/logo.png"
                        alt="logo"
                      />
                    </Link>
                  </div>
                </div>
                <div className="ml-5 hidden lg:flex lg:items-center lg:justify-center xl:col-span-1">
                  <Link href="/service">
                    <a className="text-md subpixel-antialiased text-white font-medium cursor-pointer transition duration-150 border-b border-transparent hover:border-white">
                      SERVICES
                    </a>
                  </Link>
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
                  <Link href={"/register"}>
                    <div className="px-4">
                      <p className="text-md subpixel-antialiased font-medium border-b border-transparent text-white hover:cursor-pointer hover:border-white">
                        BECOME A PAPERMAKER
                      </p>
                    </div>
                  </Link>
                  <div className="hidden space-x-2 pl-4 lg:flex lg:items-center lg:justify-end">
                    <Menu as="div" className="inline-flex items-center ">
                      <div>
                        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-white shadow-sm px-2 py-2 text-md font-medium text-white hover:border-2">
                          <UserIcon
                            aria-hidden="true"
                            className="mt-0.5 h-5 w-5 mr-1 -ml-1"
                          />
                          <p>Sign In</p>
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
                        <Menu.Items className="block absolute top-16 right-0 mt-2 w-80 border border-grey-200 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50">
                          <div className="px-4 py-3 space-y-2">
                            <p className="text-xl font-semibold">Login with</p>
                            <div className="grid grid-cols-2 gap-4">
                              <NavFacebookButton />
                              <NavGoogleButton />
                            </div>
                          </div>
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <Link href={"/login"}>
                                  <div
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-black"
                                        : "text-gray-900",
                                      "flex justify-center space-x-2 items-center px-2 py-4 hover:cursor-pointer"
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
                                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                      />
                                    </svg>
                                    <a
                                      href="#"
                                      className="block text-md font-medium"
                                    >
                                      Sign in with Paperworks account
                                    </a>
                                  </div>
                                </Link>
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
              <Link href="/login">
                <div className="max-w-3xl mx-auto px-2 py-4 space-y-1 sm:px-4">
                  <div className="flex justify-center space-x-2 items-center hover:cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <a className="block text-lg font-semibold">Sign In</a>
                  </div>
                </div>
              </Link>
              <div className="border-t-4 border-gray-300">
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
                <Link href="/register">
                  <div className="border-t-4 border-gray-300 flex justify-center space-x-2 py-4 items-center hover:cursor-pointer">
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
                </Link>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </>
  )
}
