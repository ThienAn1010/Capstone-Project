import { FC } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline"
import { useRouter } from "next/router"
interface PaginationProps {
  pageSize: number
  numberOfRecords: number
}

const Pagination: FC<PaginationProps> = ({ pageSize, numberOfRecords }) => {
  const router = useRouter()
  const pages = Math.ceil(numberOfRecords / pageSize)
  const totalPages = Array.from({ length: pages }, (_, index) => index + 1)
  const currentPage = parseInt(router.query?.page as string) || 1
  const query = router.query
  if (pages < 2) return null
  return (
    <div className="flex justify-end gap-x-0.5">
      <button
        className={`w-[38px] h-[38px] rounded-full flex justify-center items-center ${
          currentPage === 1 ? "hidden" : ""
        }`}
        onClick={async () => {
          await router.replace(
            { query: { ...query, page: currentPage - 1 } },
            undefined,
            {
              shallow: true,
            }
          )
        }}
      >
        <ChevronLeftIcon className="w-6 h-6 text-gray-500" />
      </button>
      {totalPages.map((page) => (
        <button
          key={page}
          className={`w-[38px] h-[38px] rounded-full flex justify-center items-center ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : "text-gray-900 hover:bg-blue-400 hover:text-blue-50"
          } transition`}
          onClick={async () => {
            await router.replace({ query: { ...query, page } }, undefined, {
              shallow: true,
            })
          }}
        >
          {page}
        </button>
      ))}
      <button
        className={`w-[38px] h-[38px] rounded-full flex justify-center items-center text-gray-500 hover:text-gray-900 ${
          currentPage === totalPages[totalPages.length - 1] ? "hidden" : ""
        }`}
        onClick={async () => {
          await router.replace(
            { query: { ...query, page: currentPage + 1 } },
            undefined,
            {
              shallow: true,
            }
          )
        }}
      >
        <ChevronRightIcon className="w-6 h-6 " />
      </button>
    </div>
  )
}

export default Pagination
