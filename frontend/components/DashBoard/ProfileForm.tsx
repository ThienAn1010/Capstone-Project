import Autocomplete from "react-google-autocomplete"
import { Controller, useForm } from "react-hook-form"
import React, { useState } from "react"
import toast from "react-hot-toast"
import ReactPhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { useRouter } from "next/router"
import axios from "axios"
import axiosInstance from "../../util/axiosInstace"

export default function CheckOutForm({ data }: any) {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm()

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    const registerAccount = (async () => {
      let thumbnail
      if (selectedImage) {
        const formData = new FormData()
        formData.append("file", selectedImage)
        formData.append("upload_preset", "iiyg1094")
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dybygufkr/image/upload",
          formData
        )
        thumbnail = response.data.secure_url
      }
      const response = await axiosInstance.post("/auth/register", {
        username: data.username,
        name: data.name,
        password: data.password,
        address: data.address.formatted_address,
        phoneNumber: data.phone,
        lat: data.address.geometry.location.lat,
        lng: data.address.geometry.location.lng,
        ...(thumbnail && { picture: thumbnail }),
      })
      return response
    })()
    toast.promise(
      registerAccount,
      {
        loading: "Processing...",
        error: (error) => {
          setIsLoading(false)
          if (error.response.status === 400) {
            return error.response.data.message
          }
          return "Something went wrong. Try again later !!!"
        },
        success: () => {
          setIsLoading(false)
          router.push("/register/success")
          return "Successfully register account"
        },
      },
      {
        position: "top-right",
      }
    )
  }
  return (
    <form
      className="divide-y divide-gray-200 lg:col-span-9"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="py-6 px-4 sm:p-6 lg:pb-8">
        <div>
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>

        <div className="mt-6 flex flex-col lg:flex-row">
          <div className="flex-grow space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1 rounded-md shadow-sm flex">
                <span className="bg-slate-50 border border-r-0 capitalize border-slate-300 rounded-l-md px-3 inline-flex items-center text-slate-500 sm:text-sm">
                  {/* {data?.role} */}
                  User
                </span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  disabled
                  autoComplete="username"
                  className="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200"
                  defaultValue={data?.username}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700"
              >
                About
              </label>
              <div className="mt-1">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  defaultValue={""}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Brief description for your profile. URLs are hyperlinked.
              </p>
            </div>
          </div>

          <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
            <p className="text-sm font-medium text-gray-700" aria-hidden="true">
              Photo
            </p>
            <div className="mt-1 lg:hidden">
              <div className="flex items-center">
                <div
                  className="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
                  aria-hidden="true"
                >
                  <img
                    className="rounded-full h-full w-full"
                    src={data?.picture}
                    alt="Avatar"
                  />
                </div>
                <div className="ml-5 rounded-md shadow-sm">
                  <div className="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                    <label
                      htmlFor="mobile-user-photo"
                      className="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none"
                    >
                      <span>Change</span>
                      <span className="sr-only">user photo</span>
                    </label>
                    <input
                      id="mobile-user-photo"
                      name="user-photo"
                      type="file"
                      className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                      onChange={(event: any) => {
                        console.log(event.target.files[0])
                        setSelectedImage(event.target.files[0])
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden relative rounded-full overflow-hidden lg:block">
              <img
                className="relative rounded-full w-40 h-40"
                src={data?.picture}
                alt=""
              />
              <label
                htmlFor="desktop-user-photo"
                className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
              >
                <span>Change</span>
                <span className="sr-only">user photo</span>
                <input
                  type="file"
                  id="desktop-user-photo"
                  name="user-photo"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700"
            >
              Full name
            </label>
            <input
              {...register("name", {
                required: { value: true, message: "Name is required" },
              })}
              type="text"
              name="name"
              autoComplete="given-name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              defaultValue={data?.name}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message as any}
              </p>
            )}
          </div>

          <div className="col-span-12 sm:col-span-6">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <div>
              <Controller
                control={control}
                name="phone"
                rules={{
                  required: {
                    value: true,
                    message: "Phone number is required",
                  },
                }}
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message as any}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-12">
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <Controller
              name="address"
              control={control}
              rules={{
                required: "Address is required",
                validate: {
                  value: (value) =>
                    typeof value === "object" ||
                    "Select an address in the dropdown list",
                },
              }}
              render={() => {
                return (
                  <Autocomplete
                    aria-required
                    apiKey={process.env.NEXT_PUBLIC_GG_API_KEY}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onPlaceSelected={(place) => {
                      try {
                        const updatedPlace = JSON.parse(JSON.stringify(place))
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
            {errors.address?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message as any}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
        <button
          type="button"
          className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="ml-5 bg-sky-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          {isLoading ? "Processing..." : "Save"}
        </button>
      </div>
    </form>
  )
}
