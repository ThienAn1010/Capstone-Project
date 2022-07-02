import { SearchIcon } from "@heroicons/react/solid"
import { Fragment, useState } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"

const category = [
  { id: 1, name: "Location" },
  { id: 2, name: "People" },
  { id: 3, name: "Paperwork" },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function SearchBar() {
  const [selected, setSelected] = useState(category[0])
  return (
    <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
      <div className="w-full">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative flex">
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="search"
            name="search"
            className="block w-full bg-white border border-gray-300 rounded-l-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 sm:text-sm"
            placeholder="Search"
            type="search"
          />
          <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
              <>
                <div className="relative">
                  <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-r-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none sm:text-sm hover:cursor-pointer">
                    <span className="block">{selected.name}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {category.map((category) => (
                        <Listbox.Option
                          key={category.id}
                          className={({ active }) =>
                            classNames(
                              active ? "text-white bg-test" : "text-gray-900",
                              "cursor-default select-none relative py-2 pl-3 pr-9 hover:cursor-pointer"
                            )
                          }
                          value={category}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "block"
                                )}
                              >
                                {category.name}
                              </span>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-indigo-600",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
      </div>
    </div>
  )
}
