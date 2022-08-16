import { useEffect, useRef } from "react"
import useSWR from "swr"
import { UserBooking } from "../types/UserBooking"
import axiosInstance from "../util/axiosInstace"

interface IGetUserBookings {
  bookings: UserBooking[]
  length: number
  numberOfRecords: number
}
const useGetUserBookings = (
  url: string,
  fallbackData: IGetUserBookings
) => {
  const hasMounted = useRef(false)
  useEffect(() => {
    hasMounted.current = true
  }, [])

  const { data, error, mutate } = useSWR(
    url,
    (url) =>
      axiosInstance.get<IGetUserBookings>(url).then((result) => result.data),
    {
      fallbackData: hasMounted.current ? undefined : fallbackData,
    }
  )
  const bookingData=data

  return { bookingData, error, isLoading: !bookingData && !error, mutate }
}

// const useGetUserBooking = () => {
//   const { data, error, mutate } = useSWR("users/me/bookings", (url) =>
//     axiosInstance.get<UserBooking>(url).then((result) => result.data)
//   )
//   return { data, error, isLoading: !data && !error, mutate }
// }

export default useGetUserBookings