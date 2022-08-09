import { useForm } from "react-hook-form"
import Autocomplete from "react-google-autocomplete"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import React, { useState } from "react"

const PapermakerRegisterForm = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data: any) => console.log(data)

  return (
    <div className=" w-screen min-h-screen bg-gradient-to-bl from-test via-sky-400 to-test pt-8 px-4 md:pt-30 ">
      {/* <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="signup_img.png"
          alt=""
        />
      </div> */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="container max-w-2xl bg-white mx-auto px-6 py-4 md:px-12 md:py-8 rounded-lg shadow-md">
          <div>
            <h2 className="text-center mt-6 text-3xl font-extrabold text-gray-900">
              Become a papermaker
            </h2>
          </div>
          <div>
            <div className="mt-6">
              <form
                action="#"
                method="POST"
                className="space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mt-5"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("email", {
                        required: true,
                        pattern:
                          /^([a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$)$/,
                      })}
                      name="email"
                      type="text"
                      required
                      placeholder="Enter your email"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">Invalid Email!</p>
                    )}
                  </div>
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium text-gray-700 mt-5"
                  >
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("name", {
                        required: true,
                        pattern: /^[a-zA-Z\s]*$/,
                      })}
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">Invalid Name!</p>
                    )}
                  </div>
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium text-gray-700 mt-5"
                  >
                    Address
                  </label>
                  <div className="mt-1">
                    <Autocomplete
                      aria-required
                      apiKey={process.env.GG_API_KEY}
                      placeholder="Enter address"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onPlaceSelected={(place) => {
                        console.log(JSON.stringify(place?.geometry?.location))
                      }}
                      options={{
                        types: ["geocode", "establishment"],
                      }}
                    />
                  </div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mt-5"
                  >
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <PhoneInput
                      inputProps={{
                        name: "phone",
                        required: true,
                        autoFocus: true,
                      }}
                    />
                  </div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("password", { required: true })}
                      type="password"
                      autoComplete="current-password"
                      required
                      placeholder="*******"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">Empty Password!</p>
                    )}
                  </div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("confirmPassword", { required: true })}
                      required
                      type={"password"}
                      placeholder="*******"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm">
                        Not match Password!
                      </p>
                    )}
                  </div>
                  <label className="block text-sm font-medium text-gray-700">
                    Photo
                  </label>
                  <div className="mt-1 mb-12 flex items-center">
                    <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                      {selectedImage && (
                        <div>
                          <img
                            alt="not found"
                            width={"250px"}
                            src={URL.createObjectURL(selectedImage)}
                          />
                        </div>
                      )}
                      {!selectedImage && (
                        <div>
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </div>
                      )}
                    </span>
                    <input
                      type="file"
                      name="myImage"
                      className="ml-5 w-full bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onChange={(event: any) => {
                        console.log(event.target.files[0])
                        setSelectedImage(event.target.files[0])
                      }}
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="submit"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PapermakerRegisterForm
