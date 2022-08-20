import useSWR from "swr"
import { Service } from "../types/Service"
import axiosInstance from "../util/axiosInstace"

const useGetAllServices = () => {
  const { data, error, mutate } = useSWR("/services", (url) =>
    axiosInstance
      .get<{ services: Service[] }>(url)
      .then((result) => result.data.services)
  )
  return { data, error, isLoading: !data && !error, mutate }
}

export default useGetAllServices
