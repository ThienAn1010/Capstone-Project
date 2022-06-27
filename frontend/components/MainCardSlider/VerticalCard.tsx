import { StarIcon } from "@heroicons/react/solid"

export default function VerticalCard({ ppmker }: any) {
  return (
    <div className="flex flex-wrap -mx-4 px-2 group cursor-pointer">
      <div className="w-52 sm:w-60 md:w-64 xl:w-72 p-4">
        <a
          href=""
          className="block border bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
        >
          <div className="relative pb-48 overflow-hidden">
            <img
              className="absolute h-full w-full object-cover"
              src="/user.png"
              alt=""
            />
          </div>
          <div className="p-4">
            <h2 className="text-sm md:text-base font-bold truncate">
              {ppmker.name}
            </h2>
            <p className="text-sm md:text-base truncate">
              {ppmker.type} - {ppmker.location}
            </p>
            <div className="flex flex-row items-center">
              <p className="text-yellow-700 font-semibold">4.7</p>
              <StarIcon className="h-4 w-4 text-yellow-500" />
              <StarIcon className="h-4 w-4 text-yellow-500" />
              <StarIcon className="h-4 w-4 text-yellow-500" />
              <StarIcon className="h-4 w-4 text-yellow-500" />
              <StarIcon className="h-4 w-4 text-yellow-500" />
              <p className="text-sm font-normal text-gray-500">(630,406)</p>
            </div>
            <h1 className="text-lg font-bold">{ppmker.price}</h1>
          </div>
        </a>
      </div>
    </div>
  )
}
