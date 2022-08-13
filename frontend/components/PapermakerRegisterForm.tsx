import { Controller, useForm } from "react-hook-form"
import Autocomplete from "react-google-autocomplete"
import ReactPhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import React, { useState } from "react"
import axios from "axios"
import axiosInstance from "../util/axiosInstace"
const PapermakerRegisterForm = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm()
  const onSubmit = async (data: any) => {
    // let thumbnail
    // if (selectedImage) {
    //   const formData = new FormData()
    //   formData.append("file", selectedImage)
    //   formData.append("upload_preset", "iiyg1094")
    //   try {
    //     const response = await axios.post(
    //       "https://api.cloudinary.com/v1_1/dybygufkr/image/upload",
    //       formData
    //     )
    //     thumbnail = response.data.secure_url
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    console.log(data)
    // axiosInstance.post("/")
  }
  return (
    <div className=" w-screen min-h-screen bg-gradient-to-bl from-test via-sky-400 to-test md:pt-30 ">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="container max-w-2xl bg-white mx-auto px-6 py-4 md:px-12 md:py-8 rounded-lg shadow-md">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Become a papermaker
            </h2>
          </div>
          <div>
            <div className="mt-6">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mt-5"
                  >
                    Username<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("email", {
                        required: { value: true, message: "Email is required" },
                        pattern: {
                          value:
                            /^([a-zA-Z0-9]+@(?:[a-zA-Z0-9]+.)+[A-Za-z]+$)$/,
                          message: "Email is in invalid format",
                        },
                      })}
                      placeholder="Enter your email"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message as any}
                      </p>
                    )}
                  </div>
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium text-gray-700 mt-5"
                  >
                    Name<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("name", {
                        required: { value: true, message: "Name is required" },
                      })}
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message as any}
                      </p>
                    )}
                  </div>
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium text-gray-700 mt-5"
                  >
                    Address<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <div className="mt-1">
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
                    {errors.address?.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address.message as any}
                      </p>
                    )}
                  </div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mt-5"
                  >
                    Phone Number<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <div className="mt-1">
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
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password is required",
                        },
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      type="password"
                      placeholder="*******"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password.message as any}
                      </p>
                    )}
                  </div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                    <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("confirmPassword", {
                        required: {
                          value: true,
                          message: "Confirm password is required",
                        },
                        validate: {
                          value: (value) =>
                            value === getValues("password") ||
                            "Confirm password must match password",
                        },
                      })}
                      type={"password"}
                      placeholder="*******"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword.message as any}
                      </p>
                    )}
                  </div>
                  <label className="block text-sm font-medium text-gray-700">
                    Photo
                  </label>
                  <div className="mt-1 mb-12 flex items-center">
                    <div className="inline-block h-12 w-12 rounded-full overflow-hidden bg-transparent ">
                      {selectedImage && (
                        <img
                          className="w-full h-full"
                          alt="image preview"
                          src={URL.createObjectURL(selectedImage)}
                        />
                      )}
                      {!selectedImage && (
                        <img
                          src="https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8="
                          alt="shit"
                        />
                      )}
                    </div>
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
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                  >
                    Submit
                  </button>
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
