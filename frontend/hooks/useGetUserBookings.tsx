import useSWR from "swr"
import { UserBooking } from "../types/UserBooking"
import axiosInstance from "../util/axiosInstace"

interface IGetUserBookings {
  bookings: UserBooking[]
  length: number
  status: string
}

const useGetUserBookings = () => {
  const { data, error, mutate } = useSWR("/users/me/bookings", (url) =>
    axiosInstance.get<IGetUserBookings>(url).then((result) => result.data)
  )
  return { data, error, isLoading: !data && !error, mutate }
}

export default useGetUserBookings
