import React from "react"

export default function Category() {
  let categories = [
    { id: "1", name: "Marriage Certificate", src: "/Marriage Certificate.svg" },
    { id: "2", name: "Work Permit", src: "/Work Permit.svg" },
    { id: "3", name: "Driver License", src: "/Driver License.svg" },
    { id: "4", name: "Social Insurance", src: "/Social Insurance.svg" },
    { id: "5", name: "Medical Insurance", src: "/Medical Insurance.svg" },
    {
      id: "6",
      name: "Practising Certificate",
      src: "/Practising Certificate.svg",
    },
    { id: "7", name: "Personal Income Tax", src: "/Personal Income Tax.svg" },
    { id: "8", name: "Passport", src: "/Passport.svg" },
  ]

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 sm:py-8 sm:px-6 lg:max-w-full">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Popular Categories
        </h2>
        <a
          href="#"
          className="hidden text-sm font-medium text-test hover:text-blue-800 md:block"
        >
          View all categories<span aria-hidden="true"> &rarr;</span>
        </a>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-2 gap-y-4 justify-items-center sm:gap-x-4 md:grid-cols-4 md:gap-y-4 lg:gap-x-2">
        {categories.map((category) => (
          <div key={category.id} className="group relative">
            <div className="w-full h-36 rounded-md overflow-hidden border-2 shadow-sm shadow-gray-300 hover:cursor-pointer lg:h-44 lg:w-full xl:h-64 xl:w-full">
              <img
                src={category.src}
                alt="testing101"
                className="w-full h-full object-center hover:scale-110"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-sm md:hidden">
        <a href="#" className="font-medium text-test hover:text-indigo-500">
          View all categories<span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </div>
  )
}
