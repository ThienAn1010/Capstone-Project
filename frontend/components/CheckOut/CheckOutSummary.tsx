import { useRouter } from "next/router"
import axiosInstance from "../../util/axiosInstace"

export default function CheckOutSummary({ serviceData }: any) {
  const router = useRouter()
  const handleOnClick = async () => {
    try {
      const body = {
        name: `${serviceData?.paperMaker.user.name} - ${serviceData?.service.name}`,
        description: serviceData?.description,
        amount: serviceData?.price,
        id: serviceData?.id,
      }
      const response = await axiosInstance.post("/checkout", body)
      router.push(response.data.session)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="mt-10 lg:mt-0">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

      <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="sr-only">Items in your cart</h3>
        <ul role="list" className="divide-y divide-gray-200">
          <li key={serviceData?.id} className="flex py-6 px-4 sm:px-6">
            <div className="flex-shrink-0">
              <img
                src={serviceData?.paperMaker.user.picture}
                alt="Papermaker Avatar"
                className="w-24 rounded-md"
              />
            </div>

            <div className="ml-6 flex-1 flex flex-col">
              <div className="flex">
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm">
                    <p className="font-medium text-gray-700 hover:text-gray-800">
                      {serviceData?.service.name}
                    </p>
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    {serviceData?.paperMaker.user.name}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Estimated duration: {serviceData?.duration} days
                  </p>
                </div>
              </div>

              <div className="flex-1 pt-2 flex items-end justify-between">
                <p className="mt-1 text-sm font-medium text-gray-900">
                  ${serviceData?.price}
                </p>
              </div>
            </div>
          </li>
        </ul>
        <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
          <div className="flex items-center justify-between">
            <dt className="text-base font-medium">Total</dt>
            <dd className="text-base font-medium text-gray-900">
              ${serviceData?.price}
            </dd>
          </div>
        </dl>

        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
          <button
            type="button"
            onClick={handleOnClick}
            className="w-full bg-test border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500"
          >
            Confirm order
          </button>
        </div>
      </div>
    </div>
  )
}
