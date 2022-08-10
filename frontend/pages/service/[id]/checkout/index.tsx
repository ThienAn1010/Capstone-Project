import type { NextPage } from "next"
import { useRouter } from "next/router"
import Autocomplete from "react-google-autocomplete"
// import CheckOutLoader from "../../../../components/LoadingSkeleton/checkOutLoader"
import useGetMe from "../../../../hooks/useGetMe"
import useGetOfferedService from "../../../../hooks/useGetOfferedService"

const Checkout: NextPage = () => {
  const { data: userData } = useGetMe()
  const router = useRouter()
  const {
    data: serviceData,
    error,
    isLoading,
  } = useGetOfferedService(router.query.id as string)
  console.log(serviceData, error, isLoading)
  return (
    <>
      <main className="bg-checkout">
        <div className="max-w-7xl mx-auto pt-14 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:max-w-none">
            <h1 className="sr-only">Checkout</h1>

            <form
              id="checkout"
              className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
            >
              <div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    Contact information
                  </h2>

                  <div className="mt-4">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        id="email-address"
                        name="email-address"
                        autoComplete="email"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={userData?.username}
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="first-name"
                          name="first-name"
                          autoComplete="given-name"
                          value={userData?.name}
                          defaultValue=""
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          autoComplete="tel"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <div className="mt-1">
                        <Autocomplete
                          aria-required
                          apiKey={process.env.NEXT_PUBLIC_GG_API_KEY}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          onPlaceSelected={(place: any) => {
                            console.log(
                              JSON.stringify(place?.geometry?.location)
                            )
                          }}
                          options={{
                            types: ["geocode", "establishment"],
                            componentRestrictions: { country: "vn" },
                          }}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="note"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Note
                      </label>
                      <div className="mt-1">
                        <textarea
                          name="note"
                          id="note"
                          form="checkout"
                          style={{ resize: "none" }}
                          rows={5}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order summary */}
              <div className="mt-10 lg:mt-0">
                <h2 className="text-lg font-medium text-gray-900">
                  Order summary
                </h2>

                <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <h3 className="sr-only">Items in your cart</h3>
                  <ul role="list" className="divide-y divide-gray-200">
                    <li
                      key={serviceData?.id}
                      className="flex py-6 px-4 sm:px-6"
                    >
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
                      type="submit"
                      className="w-full bg-test border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500"
                    >
                      Confirm order
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}

export default Checkout
