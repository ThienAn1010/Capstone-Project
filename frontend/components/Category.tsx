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
    <div className="flex flex-wrap justify-around px-2 lg:px-32 mt-10 ">
      {categories.map((category) => (
        <React.Fragment key={category.id}>
          <div className="hidden sm:inline-block w-52 flex-none group cursor-pointer mb-5 lg:inline-block lg:w-80 flex-none group cursor-pointer mb-5">
            <div className="w-34 h-34 lg:w-56 lg:h-56">
              <img
                src={category.src}
                className="object-cover border rounded-md h-full w-full mix-blend-multiply lg:transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                alt="category"
              />
            </div>
            {/* <div className="mt-2">
              <h1 className="font-bold">{category.name}</h1>
            </div> */}
          </div>
          <div className="flex-initial mt-2 mb-2 sm:hidden">
            <h1 className="rounded-full border py-1 px-2 mr-1 font-bold border-black hover:bg-gray-200 flex items-center justify-center text-center">
              {category.name}
            </h1>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}
