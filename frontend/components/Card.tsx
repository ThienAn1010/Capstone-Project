import { StarIcon } from "@heroicons/react/solid"

export default function Card({ ppmker }: any) {
  return (
    <div className="flex flex-wrap -mx-4 p-2">
      <div className="w-full sm:w-60 md:w-64 xl:w-72 p-4">
        <a
          href=""
          className="block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
        >
          <div className="relative pb-48 overflow-hidden">
            <img
              className="absolute h-full w-full object-cover"
              src="/user.png"
              alt=""
            />
          </div>
          <div className="p-4">
            <h2 className="text-sm md:text-base font-bold">{ppmker.name}</h2>
            <p className="text-sm md:text-base truncate">{ppmker.location}</p>
            <p className="text-yellow-700 font-semibold inline">4.7</p>
            <StarIcon className="h-4 w-4 text-yellow-500 inline mb-1" />
            <StarIcon className="h-4 w-4 text-yellow-500 inline mb-1" />
            <StarIcon className="h-4 w-4 text-yellow-500 inline mb-1" />
            <StarIcon className="h-4 w-4 text-yellow-500 inline mb-1" />
            <StarIcon className="h-4 w-4 text-yellow-500 inline mb-1" />
            <p className="inline text-sm font-normal text-gray-500">
              (630,406)
            </p>
            <h1 className="font-bold">{ppmker.price}</h1>
            <div className="py-1 px-2 bg-yellow-200 inline-block rounded-sm">
              <p className="text-xs font-semibold mx-auto text-center">
                {ppmker?.type}
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}
