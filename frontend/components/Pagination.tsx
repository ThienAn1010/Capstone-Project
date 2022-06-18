import { FC } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline"
interface PaginationProps {}

const Pagination: FC<PaginationProps> = () => {
  return (
    <div className="flex justify-center gap-x-1">
      <button className="w-[38px] h-[38px] rounded-full flex justify-center items-center">
        <ChevronLeftIcon className="w-6 h-6 text-gray-500" />
      </button>
      <button className="w-[38px] h-[38px] rounded-full flex justify-center items-center bg-blue-400 text-blue-50">
        1
      </button>
      <button className="w-[38px] h-[38px] rounded-full flex justify-center items-center  text-gray-900 hover:bg-blue-400 hover:text-blue-50 transition">
        2
      </button>
      <button className="w-[38px] h-[38px] rounded-full flex justify-center items-center  text-gray-900">
        3
      </button>
      <button className="w-[38px] h-[38px] rounded-full flex justify-center items-center">
        <ChevronRightIcon className="w-6 h-6 text-gray-500" />
      </button>
    </div>
  )
}

export default Pagination
