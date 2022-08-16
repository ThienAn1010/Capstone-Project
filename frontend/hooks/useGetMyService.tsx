import useSWR from "swr"
import axiosInstance from "../util/axiosInstace"

const useGetMyService = () => {
  const { data, error, mutate } = useSWR(`/users/me/offered-services`, (url) =>
    axiosInstance.get<any>(url).then((response) => response.data)
  )

  return { data, error, isLoading: !data && !error, mutate }
}

export default useGetMyService
