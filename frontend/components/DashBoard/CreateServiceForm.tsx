import { useState } from "react"
import useGetAllServices from "../../hooks/useGetAllServices"
import { useForm } from "react-hook-form"
import axiosInstance from "../../util/axiosInstace"
import toast from "react-hot-toast"
import Select from "react-select"
import React from "react"

const options = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
]

type OptionType = { value: string; label: string }

export default function CreateServiceForm() {
  const { data } = useGetAllServices()
  // console.log(data)
  const [selected, setSelected] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState("day")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleSelectionChange = (option: OptionType | null) => {
    if (option) {
      setSelectedOption(option.value)
    }
  }

  const categoryOptions = data?.map((item) => {
    return {
      label: item.name,
      value: item.name,
    }
  })

  const handleCategorySelectionChange = (option: OptionType | null) => {
    if (option) {
      setSelected(option.value)
    }
  }

  // eslint-disable-next-line no-unused-vars
  const onSubmit = async (data: any) => {
    setIsLoading(true)
    const createService = (async () => {
      const response = await axiosInstance.post("/offered-services", {
        category: selected,
        duration: data.duration,
        time: selectedOption,
        price: data.price,
        description: data.description,
        documents: data.documents,
        estimate: data.estimate,
      })
      return response
    })()
    toast.promise(
      createService,
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
          return "Successfully register account"
        },
      },
      {
        position: "bottom-center",
      }
    )
  }

  const testSubmit = async (data: any) => {
    console.log(selected)
    console.log(data.duration)
    console.log(selectedOption)
    console.log(data.price)
    console.log(data.description)
    console.log(data.documents)
    console.log(data.estimate)
  }

  return (
    <div className="px-4 py-4 lg:col-span-9">
      <p className="text-center font-semibold text-xl">
        You have not create any service!
      </p>
      <div className="flex items-center my-4 px-20 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
        <p className="text-center font-semibold text-xl mx-4 mb-0">
          CREATE NOW
        </p>
      </div>
      <form
        className="space-y-8 divide-y divide-gray-200"
        onSubmit={handleSubmit(testSubmit)}
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Service Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Category
                </label>
                <div className="relative max-w-lg mt-1 sm:mt-0 sm:max-w-xs sm:col-span-2">
                  <Select
                    options={categoryOptions}
                    onChange={handleCategorySelectionChange}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Expected Duration
                </label>
                <div className="relative max-w-lg mt-1 sm:mt-0 sm:max-w-xs sm:col-span-2">
                  <input
                    {...register("duration", {
                      required: {
                        value: true,
                        message: "Duration is required",
                      },
                    })}
                    type="number"
                    name="duration"
                    className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message as any}
                    </p>
                  )}
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <label htmlFor="time" className="sr-only">
                      Time
                    </label>
                    <Select
                      options={options}
                      isSearchable={false}
                      defaultValue={options[0]}
                      onChange={handleSelectionChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Price
                </label>
                <div className="relative max-w-lg mt-1 sm:mt-0 sm:max-w-xs  sm:col-span-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    {...register("price", {
                      required: { value: true, message: "Price is required" },
                    })}
                    type="text"
                    name="price"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                    aria-describedby="price-currency"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message as any}
                    </p>
                  )}
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span
                      className="text-gray-500 sm:text-sm"
                      id="price-currency"
                    >
                      USD
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Service Details
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Provide detailed descriptions of the service
              </p>
            </div>
            <div className="space-y-6 sm:space-y-5">
              <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Description
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <textarea
                      {...register("description", {
                        required: {
                          value: true,
                          message: "Service description is required",
                        },
                      })}
                      id="description"
                      name="description"
                      rows={3}
                      className="max-w-lg shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                      defaultValue={""}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message as any}
                      </p>
                    )}
                    <p className="mt-2 text-sm text-gray-500">
                      Write a few sentences about yourself and your service.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Required Documents
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <textarea
                      {...register("documents", {
                        required: {
                          value: true,
                          message: "Required Documents is required",
                        },
                      })}
                      id="documents"
                      name="documents"
                      rows={3}
                      className="max-w-lg shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                      defaultValue={""}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message as any}
                      </p>
                    )}
                    <p className="mt-2 text-sm text-gray-500">
                      Write a few sentences about the required documents.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Estimated Duration
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <textarea
                      {...register("estimate", {
                        required: {
                          value: true,
                          message: "Estimated duration is required",
                        },
                      })}
                      id="estimate"
                      name="estimate"
                      rows={3}
                      className="max-w-lg shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                      defaultValue={""}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message as any}
                      </p>
                    )}
                    <p className="mt-2 text-sm text-gray-500">
                      Write a few sentences about the estimated duration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
