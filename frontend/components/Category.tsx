import Link from "next/link"
export default function Category() {
  let categories = [
    {
      id: "1",
      name: "Marriage Certificate",
      src: "/Marriage Certificate.webp",
    },
    { id: "2", name: "Work Permit", src: "/Work Permit.webp" },
    { id: "3", name: "Driver License", src: "/Driver License.webp" },
    { id: "4", name: "Social Insurance", src: "/Social Insurance.webp" },
    { id: "5", name: "Medical Insurance", src: "/Medical Insurance.webp" },
    {
      id: "6",
      name: "Practising Certificate",
      src: "/Practising Certificate.webp",
    },
    { id: "7", name: "Personal Income Tax", src: "/Personal Income Tax.webp" },
    { id: "8", name: "Passport", src: "/Passport.webp" },
  ]

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 sm:py-8 sm:px-6 lg:max-w-full">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
          Popular Categories
        </h2>
        <Link href="/service">
          <p className="hidden text-sm font-medium text-test hover:text-blue-800 md:block hover:cursor-pointer">
            View all categories<span aria-hidden="true"> &rarr;</span>
          </p>
        </Link>
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
            <p className="hidden text-lg font-medium text-center mt-3 text-stone-700 hover:text-blue-900 md:block hover:cursor-pointer">
              {category.name}
            </p>
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
