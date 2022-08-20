import useSWR from "swr"
import axiosInstance from "../util/axiosInstace"

const useGetMyBooking = (id: string) => {
  const { data, error, mutate } = useSWR(`/bookings/${id}`, (url) =>
    axiosInstance.get<any>(url).then((response) => response.data)
  )

  return { data, error, isLoading: !data && !error, mutate }
}

export default useGetMyBooking
