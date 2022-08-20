import useSWR from "swr"
import axiosInstance from "../util/axiosInstace"

const useGetPaperMakerBooking = () => {
  const { data, error, mutate } = useSWR("/users/me/bookings", (url) =>
    axiosInstance.get<any>(url).then((result) => result.data)
  )
  return { data, error, isLoading: !data && !error, mutate }
}

export default useGetPaperMakerBooking
