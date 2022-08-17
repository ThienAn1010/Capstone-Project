import useGetMyService from "../../hooks/useGetMyService"
import LoadingSpinner from "../LoadingSkeleton/LoadingSpinner"

import CreateServiceForm from "./CreateServiceForm"

export default function MyService() {
  const { data, isLoading } = useGetMyService()

  return (
    <>
      {isLoading ? (
        <div className="container mx-auto p-20">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="px-4 py-4 lg:col-span-9">
          {data.data.paperMaker.offeredServices.length == 1 ? null : (
            <>
              <p className="text-center font-semibold text-xl">
                You have not create any service!
              </p>
              <div className="flex items-center my-4 px-20 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center font-semibold text-xl mx-4 mb-0">
                  CREATE NOW
                </p>
              </div>
            </>
          )}

          <CreateServiceForm />
        </div>
      )}
    </>
  )
}
