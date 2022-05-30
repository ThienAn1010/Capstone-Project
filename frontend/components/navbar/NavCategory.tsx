import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import { Fragment } from "react"

export default function NavCategory({ categories }: { categories: string[] }) {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left mr-3">
        <div>
          <Menu.Button className="inline-flex justify-center items-center w-full px-4 py-2 text-base font-medium text-white">
            Categories
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-black-200 hover:text-black-100"
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
          <Menu.Items className="absolute left-0 w-56 mt-1 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none h-96 overflow-y-auto">
            <div className="px-4 py-1 truncate">
              {categories.map((category, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    // <Link href={`/room/filter/${category._id}`}>
                    <button
                      className={`${
                        active ? "text-indigo-600" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      {category}
                    </button>
                    // </Link>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
