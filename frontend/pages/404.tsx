import { ChevronRightIcon } from "@heroicons/react/solid"
import {
  MapIcon,
  BookOpenIcon,
  IdentificationIcon,
} from "@heroicons/react/outline"
import Link from "next/link"

const links = [
  {
    title: "Categories",
    description: "Explore all of our paperwork categories",
    icon: BookOpenIcon,
    path: "/service",
  },
  {
    title: "Map View",
    description: "Explore papermakers around you",
    icon: MapIcon,
    path: "/",
  },
  {
    title: "Dashboard",
    description: "View your personal information & Check out your order",
    icon: IdentificationIcon,
    path: "/",
  },
]

export default function ErrorPage() {
  return (
    <div className="bg-white">
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto py-16 sm:py-20">
          <div className="text-center">
            <p className="text-md font-semibold text-test uppercase tracking-wide">
              404 error
            </p>
            <h1 className="mt-2 text-4xl font-bold text-black tracking-tight sm:text-5xl">
              This page does not exist.
            </h1>
            <p className="mt-2 text-lg text-gray-500">
              The page you are looking for could not be found.
            </p>
          </div>
          <div className="mt-12">
            <h2 className="text-sm font-semibold text-gray-500 tracking-wide uppercase">
              Popular pages
            </h2>
            <ul
              role="list"
              className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200"
            >
              {links.map((link, linkIdx) => (
                <Link href={link.path} key={linkIdx}>
                  <li className="relative py-6 flex items-start space-x-4 hover:cursor-pointer">
                    <div className="flex-shrink-0">
                      <span className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-50">
                        <link.icon
                          className="h-6 w-6 text-test"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-medium text-gray-900">
                        <span className="rounded-sm">
                          <p className="focus:outline-none">
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            {link.title}
                          </p>
                        </span>
                      </h3>
                      <p className="text-base text-gray-500">
                        {link.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 self-center">
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/">
                <p className="text-base w-fit font-medium hover:cursor-pointer text-test hover:text-blue-800">
                  Or go back home<span aria-hidden="true"> &rarr;</span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
