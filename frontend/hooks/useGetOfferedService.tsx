import useSWR from "swr"
import { OfferedService } from "../types/OfferedService"
import axiosInstance from "../util/axiosInstace"

const useGetOfferedService = (id: string) => {
  const { data, error, mutate } = useSWR(`/offered-services/${id}`, (url) =>
    axiosInstance.get<OfferedService>(url).then((response) => response.data)
  )

  return { data, error, isLoading: !!data && !!error, mutate }
}

export default useGetOfferedService
