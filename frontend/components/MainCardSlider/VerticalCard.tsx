import { StarIcon } from "@heroicons/react/solid"
import Link from "next/link"

export default function VerticalCard({ ppmker }: any) {
  return (
    <div className="flex flex-wrap -mx-4 px-2 group cursor-pointer">
      <Link key={ppmker.service.id} href="/service/cl5pj854304658h13bhsmr2bk">
        <div className="w-52 sm:w-60 md:w-64 xl:w-72 p-4">
          <div className="block border bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
            <div className="relative pb-48 overflow-hidden">
              <img
                className="absolute h-full w-full object-cover"
                src={`${ppmker.paperMaker.user.picture}`}
                alt=""
              />
            </div>
            <div className="p-4">
              <h2 className="text-sm md:text-base font-bold truncate">
                {ppmker.paperMaker.user.name}
              </h2>
              <p className="text-sm md:text-base truncate">
                {ppmker.service.name} - {ppmker.paperMaker.user.address}
              </p>
              <div className="flex flex-row items-center">
                <p className="text-yellow-700 font-semibold">4.7</p>
                <StarIcon className="h-4 w-4 text-yellow-500" />
                <StarIcon className="h-4 w-4 text-yellow-500" />
                <StarIcon className="h-4 w-4 text-yellow-500" />
                <StarIcon className="h-4 w-4 text-yellow-500" />
                <StarIcon className="h-4 w-4 text-yellow-500" />
                <p className="text-sm font-normal text-gray-500">({ppmker.paperMaker.pastSuccessfulCases})</p>
              </div>
              <h1 className="text-lg font-bold">${ppmker.price}</h1>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
