import { StarIcon } from "@heroicons/react/solid"
// import Tippy from "@tippyjs/react/headless"

export default function Card({ ppmker }) {
  return (
    <div className="group cursor-pointer">
      <div>
        <div className="h-36 w-full group-hover:bg-gray-50 group-hover:border-gray-50 rounded-md">
          <img
            src="default.png"
            className="object-cover border-gray-300 border rounded-md h-full w-full  mix-blend-multiply"
            alt="papermaker"
          />
        </div>

        <div className="leading-snug mt-2">
          <h1 className="font-bold">{ppmker.name}</h1>
          <p className="text-sm font-normal text-gray-500 truncate">
            {ppmker.location}
          </p>
          <p className="text-yellow-700 font-semibold inline">4.7</p>
          <StarIcon className="h-4 w-4 text-yellow-500 inline mb-1" />
          <StarIcon className="h-4 w-4 text-yellow-500 inline mb-1" />
          <StarIcon className="h-4 w-4 text-yellow-500 inline mb-1" />
          <StarIcon className="h-4 w-4 text-yellow-500 inline mb-1" />
          <StarIcon className="h-4 w-4 text-yellow-500 inline mb-1" />
          <p className="inline text-sm font-normal text-gray-500">(630,406)</p>
          <h1 className="font-bold">${ppmker.price}</h1>
          {ppmker.type && (
            <div className="py-1 px-2 bg-yellow-200 inline-block rounded-sm">
              <p className="text-xs font-semibold mx-auto text-center">
                {ppmker?.type}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
