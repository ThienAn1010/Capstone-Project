import useSWR from "swr"
import { User } from "../types/User"
import axiosInstance from "../util/axiosInstace"

const useGetMe = () => {
  const { data, error, mutate } = useSWR("users/me", (url) =>
    axiosInstance.get<User>(url).then((result) => result.data)
  )
  return { data, error, isLoading: !data && !error, mutate }
}

export default useGetMe
