import { StarIcon } from "@heroicons/react/solid"

export default function HorizontalCard({ ppmker }: any) {
  return (
    <div className="grid grid-cols-3 shadow-md border hover:shadow-xl w-full bg-white rounded-lg overflow-hidden cursor-pointer">
      <img
        className="object-cover w-full h-40 col-span-1 border-r"
        src="/user.png"
        alt="User avatar"
      />

      <div className="py-4 px-4 col-span-2 space-y-1">
        <h2 className="text-lg font-semibold truncate">{ppmker.paperMaker.user.name}</h2>
        <p className="text-base">
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
        <h1 className="text-lg font-bold">{ppmker.price}</h1>
      </div>
    </div>
  )
}
