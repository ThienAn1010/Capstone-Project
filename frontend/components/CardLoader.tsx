import { FC } from "react"

const CardLoader: FC = () => {
  return (
    <div className="pb-3 border-b border-b-[#d1d7dc]">
      <div className="animate-pulse flex space-x-4">
        <div className="bg-gray-400 w-[260px] h-[145px]"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-gray-400 rounded col-span-2"></div>
              <div className="h-2 bg-gray-400 rounded col-span-1"></div>
              <div className="h-2 bg-gray-400 rounded col-span-3"></div>
              <div className="h-2 bg-gray-400 rounded col-span-3"></div>
            </div>
            <div className="h-2 bg-gray-400 rounded w-1/3"></div>
            <div className="h-2 bg-gray-400 rounded w-1/3"></div>
            <div className="h-2 bg-gray-400 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardLoader
