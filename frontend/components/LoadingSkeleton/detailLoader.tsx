import { FC } from "react"

const DetailLoader: FC = () => {
  return (
    <div className="container mx-auto px-14 py-12 animate-pulse">
      <div className="grid grid-cols-3 gap-2 ">
        <div className="col-span-2 space-y-8 pl-32 pr-8">
          <div className="flex space-x-6 ">
            <div>
              <div className="inline-block h-60 w-60 bg-gray-300 rounded" />
            </div>
            <div className="space-y-4">
              <div className="h-6 w-[15ch] bg-gray-300 rounded" />
              <div className="h-10 w-[44ch] bg-gray-300 rounded" />
              <div className="h-4 w-[25ch] bg-gray-300 rounded" />
              <div className="h-4 w-[15ch] bg-gray-300 rounded" />
              <div className="h-4 w-[20ch] bg-gray-300 rounded" />
              <div className="h-4 w-[23ch] bg-gray-300 rounded" />
              <div className="h-4 w-[21ch] bg-gray-300 rounded" />
            </div>
          </div>

          <div>
            <div className="space-y-2">
              <div className="h-6 w-[18ch] bg-gray-300 rounded" />
              <div className="h-4 w-[80ch] bg-gray-300 rounded" />
              <div className="h-4 w-[80ch] bg-gray-300 rounded" />
              <div className="h-4 w-[80ch] bg-gray-300 rounded" />
              <div className="h-4 w-[80ch] bg-gray-300 rounded" />
              <div className="h-4 w-[80ch] bg-gray-300 rounded" />
            </div>
          </div>
          <div>
            <div className="space-y-2">
              <div className="h-6 w-[18ch] bg-gray-300 rounded" />
              <div className="h-4 w-[80ch] bg-gray-300 rounded" />
              <div className="h-4 w-[80ch] bg-gray-300 rounded" />
              <div className="h-4 w-[80ch] bg-gray-300 rounded" />
              <div className="h-4 w-[80ch] bg-gray-300 rounded" />
              <div className="h-4 w-[80ch] bg-gray-300 rounded" />
            </div>
          </div>
          <div className="pb-8">
            <div className="space-y-2">
              <div className="h-6 w-[18ch] bg-gray-300 rounded" />
              <div className="h-4 w-[80ch] bg-gray-300 rounded" />
              <div className="h-4 w-[80ch] bg-gray-300 rounded" />
              <div className="h-4 w-[80ch] bg-gray-300 rounded" />
              <div className="h-4 w-[80ch] bg-gray-300 rounded" />
              <div className="h-4 w-[80ch] bg-gray-300 rounded" />
            </div>
          </div>
          {/* <div className="pt-10 border-t-2">
            <Feedback />
          </div> */}
        </div>
        <div className="ml-8">
          <div className="h-64 w-72 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default DetailLoader
