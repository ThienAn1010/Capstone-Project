import { useEffect, useMemo, useState } from "react"
import useGetAllServices from "../../hooks/useGetAllServices"
import { Controller, useForm } from "react-hook-form"
import axiosInstance from "../../util/axiosInstace"
import toast from "react-hot-toast"
import Select from "react-select"
import React from "react"
import { useDropzone } from "react-dropzone"
import LoadingSpinner from "../LoadingSkeleton/LoadingSpinner"
import axios from "axios"

const baseStyle = {
  flex: 1,
  width: "100%",
  display: "flex",
  marginTop: "1rem",
  flexDirection: "column" as "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#D3D3D3",
  borderStyle: "dashed",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
}

const focusedStyle = {
  borderColor: "#2196f3",
}

const acceptStyle = {
  borderColor: "#00e676",
}

const rejectStyle = {
  borderColor: "#ff1744",
}

export default function CreateServiceForm({ serviceData }: any) {
  const [files, setFiles]: any = useState([])
  const [error, setError] = useState("")
  const { data, isLoading: serviceLoading } = useGetAllServices()
  const [isLoading, setIsLoading] = useState(false)
  const serviceId = serviceData?.offeredServices[0]?.id
  const hasService = serviceData.offeredServices.length == 1
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const categoryOptions = data?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    }
  })

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
      maxSize: 10485760,
      maxFiles: 1,
      multiple: false,
      onDrop: (acceptedFiles, fileRejections) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        )
        fileRejections.forEach((file) => {
          file.errors.forEach((err) => {
            if (err.code === "file-too-large") {
              setError("Error: File must not exceed 10MB limit!")
            }

            if (err.code === "file-invalid-type") {
              setError("Error: File must be an image!")
            }
          })
        })
      },
    })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  )

  const thumbs = files.map((file: any) => (
    <div key={file.name}>
      <div className="h-80 w-full rounded-md mt-4">
        <img
          src={file.preview}
          alt="Service Image"
          onLoad={() => {
            URL.revokeObjectURL(file.preview)
          }}
          className="object-cover border-gray-300 border rounded-md h-full w-full group-hover:mix-blend-multiply"
        />
      </div>
    </div>
  ))

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file: any) => URL.revokeObjectURL(file.preview))
  })

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    const createOrUpdateService = (async () => {
      let thumbnail
      if (files.length == 1) {
        const formData = new FormData()
        formData.append("file", files[0])
        formData.append("upload_preset", "iiyg1094")
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dybygufkr/image/upload",
          formData
        )
        thumbnail = response.data.secure_url
      }
      if (hasService) {
        const response = await axiosInstance.patch(
          `/offered-services/${serviceId}`,
          {
            serviceId: data.category,
            duration: Number(data.duration),
            price: Number(data.price),
            description: data.description,
            documents: data.documents,
            estimate: data.estimate,
            thumbnail: thumbnail,
          }
        )
        return response
      } else {
        const response = await axiosInstance.post("/offered-services", {
          serviceId: data.category,
          duration: Number(data.duration),
          price: Number(data.price),
          description: data.description,
          documents: data.documents,
          estimate: data.estimate,
          thumbnail: thumbnail,
        })
        return response
      }
    })()
    toast.promise(
      createOrUpdateService,
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
          return "Successfully create a service"
        },
      },
      {
        position: "bottom-center",
      }
    )
  }

  return (
    <div className="px-4 py-4 lg:col-span-9">
      {serviceLoading ? (
        <div className="container mx-auto p-20">
          <LoadingSpinner />
        </div>
      ) : (
        <form
          className="space-y-8 divide-y divide-gray-200"
          onSubmit={handleSubmit(onSubmit)}
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
                    <Controller
                      control={control}
                      name="category"
                      defaultValue="1"
                      rules={{
                        required: {
                          value: true,
                          message: "Service category is required",
                        },
                      }}
                      render={({ field: { onChange, value, ref } }) => {
                        return (
                          <Select
                            ref={ref}
                            options={categoryOptions}
                            classNamePrefix="addl-class"
                            isClearable={true}
                            value={categoryOptions?.find(
                              (c) => c.value === value
                            )}
                            onChange={(val) => onChange(val?.value)}
                            styles={{
                              input: (base) => ({
                                ...base,
                                "input:focus": {
                                  boxShadow: "none",
                                },
                              }),
                            }}
                          />
                        )
                      }}
                    />
                    {errors.category?.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.category.message as any}
                      </p>
                    )}
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

                  <div className="relative max-w-lg mt-1 mb-2 sm:mt-0 sm:max-w-xs sm:col-span-2">
                    <input
                      {...register("duration", {
                        required: {
                          value: true,
                          message: "Duration is required",
                        },
                      })}
                      defaultValue={serviceData?.offeredServices[0]?.duration}
                      type="text"
                      name="duration"
                      className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                    {errors.duration && (
                      <p className="absolute text-red-500 text-sm mt-1">
                        {errors.duration.message as any}
                      </p>
                    )}
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span
                        className="text-gray-500 sm:text-sm"
                        id="price-currency"
                      >
                        Day(s)
                      </span>
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
                  <div className="relative max-w-lg mt-1 mb-2 sm:mt-0 sm:max-w-xs  sm:col-span-2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      {...register("price", {
                        required: { value: true, message: "Price is required" },
                      })}
                      type="number"
                      name="price"
                      defaultValue={serviceData?.offeredServices[0]?.price}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                      aria-describedby="price-currency"
                    />
                    {errors.price && (
                      <p className="absolute text-red-500 text-sm mt-1">
                        {errors.price.message as any}
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
                        defaultValue={
                          serviceData?.offeredServices[0]?.description
                        }
                        rows={5}
                        className="max-w-lg shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                      />
                      <p className="mt-2 text-sm text-gray-500">
                        Write a few sentences about yourself and your service.
                      </p>
                      {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.description.message as any}
                        </p>
                      )}
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
                        defaultValue={
                          serviceData?.offeredServices[0]?.documents
                        }
                        rows={5}
                        className="max-w-lg shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                      />
                      <p className="mt-2 text-sm text-gray-500">
                        Write a few sentences about the required documents.
                      </p>
                      {errors.documents && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.documents.message as any}
                        </p>
                      )}
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
                        defaultValue={serviceData?.offeredServices[0]?.estimate}
                        name="estimate"
                        rows={5}
                        className="max-w-lg shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                      />
                      <p className="mt-2 text-sm text-gray-500">
                        Write a few sentences about the estimated duration.
                      </p>
                      {errors.estimate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.estimate.message as any}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 sm:pt-10">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Service Display Picture
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Provide an image of the service or use the default image
                </p>
              </div>

              <div {...getRootProps({ style })}>
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input {...getInputProps()} />
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
                <p className="text-xs text-gray-500">
                  Click to select image or drag an image in.
                </p>
                {error && (
                  <>
                    <p className="mt-4 text-red-500 text-lg">{error}</p>
                  </>
                )}
                {thumbs}
              </div>
              <div className="text-center">
                {files.length > 0 && (
                  <button
                    type="button"
                    className="justify-center mt-4 py-2 px-4 bg-red-600 text-white active:bg-red-700 text-sm font-bold uppercase rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    onClick={() => setFiles([])}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                className="mr-5 bg-sky-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-gray-400 disabled:cursor-wait"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Save"}
              </button>

              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
