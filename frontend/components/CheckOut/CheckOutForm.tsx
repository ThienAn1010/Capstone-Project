import { useRouter } from "next/router"
import { FC, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import ReactPhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { OfferedService } from "../../types/OfferedService"
import { User } from "../../types/User"
import axiosInstance from "../../util/axiosInstace"
import Autocomplete from "react-google-autocomplete"
interface CheckoutFormProps {
  userData: User
  serviceData: OfferedService
}

const CheckOutForm: FC<CheckoutFormProps> = ({ userData, serviceData }) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      const body = {
        name: `${serviceData?.paperMaker.user.name} - ${serviceData?.service.name}`,
        description: serviceData?.description,
        amount: serviceData?.price,
        id: serviceData?.id,
        phone: data.phone,
        address: data.address.formatted_address,
        location: {
          ...data.address.geometry.location,
        },
        ...(data.note && { note: data.note }),
      }
      setIsLoading(false)
      const response = await axiosInstance.post("/checkout", body)
      router.push(response.data.session)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }
  return (
    <form
      id="checkout"
      className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
      onSubmit={handleSubmit(onSubmit)}
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
              Username
            </label>
            <div className="mt-1">
              <input
                type="text"
                className="block w-full border-gray-300 rounded-md shadow-sm
                 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-slate-200"
                value={userData.username}
                disabled
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-red-500">Email is required</p>
            )}
          </div>
          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-slate-200"
                  value={userData.name}
                  disabled
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-red-500">Name is required</p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 "
              >
                Phone<span className="text-red-500 ml-0.5">*</span>
              </label>
              <div className="mt-1">
                <Controller
                  control={control}
                  name="phone"
                  rules={{ required: true }}
                  render={({ field: { ref, ...field } }) => (
                    <ReactPhoneInput
                      {...field}
                      inputProps={{
                        ref,
                        required: true,
                      }}
                      country={"vn"}
                      onlyCountries={["vn"]}
                      countryCodeEditable={false}
                      specialLabel={"Player Mobile Number"}
                      inputClass="block !w-full border-gray-300 rounded-md shadow-sm
                      focus:ring-blue-500 focus:border-blue-500 sm:text-sm !h-[38px]"
                    />
                  )}
                />
                {errors.phone && (
                  <p className="mt-1 text-red-500">Phone number is required</p>
                )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address<span className="text-red-500 ml-0.5">*</span>
              </label>
              <div className="mt-1">
                <Controller
                  name="address"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={() => {
                    return (
                      <Autocomplete
                        aria-required
                        apiKey={process.env.NEXT_PUBLIC_GG_API_KEY}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onPlaceSelected={(place) => {
                          try {
                            const updatedPlace = JSON.parse(
                              JSON.stringify(place)
                            )
                            setValue("address", updatedPlace)
                          } catch (error) {
                            console.log(error)
                          }
                        }}
                        options={{
                          types: ["geocode", "establishment"],
                          componentRestrictions: { country: "vn" },
                        }}
                      />
                    )
                  }}
                />

                {errors.address && (
                  <p className="mt-1 text-red-500">
                    Please choose a valid address from a dropdown
                  </p>
                )}
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
                  style={{ resize: "none" }}
                  rows={5}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  {...register("note")}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              type="submit"
              className="w-full bg-test border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500
              disabled:bg-gray-400 disabled:cursor-wait"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Confirm order"}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default CheckOutForm
