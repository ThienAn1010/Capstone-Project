import useGetMyService from "../../hooks/useGetMyService"

import CreateServiceForm from "./CreateServiceForm"

export default function MyService() {
  const { data } = useGetMyService()
  console.log(data)

  return (
    <div className="px-4 py-4 lg:col-span-9">
      {data ? null : (
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
  )
}
