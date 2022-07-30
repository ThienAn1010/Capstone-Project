import { useEffect, useRef } from "react"
import useSWR from "swr"
import { OfferedService } from "../types/OfferedService"
import axiosInstance from "../util/axiosInstace"

interface IGetOfferedServices {
  offeredServices: OfferedService[]
  length: number
  numberOfRecords: number
}

const useGetOfferedServices = (
  url: string,
  fallbackData: IGetOfferedServices
) => {
  const hasMounted = useRef(false)
  useEffect(() => {
    hasMounted.current = true
  }, [])

  const { data, error, mutate } = useSWR(
    url,
    (url) =>
      axiosInstance.get<IGetOfferedServices>(url).then((result) => result.data),
    {
      fallbackData: hasMounted.current ? undefined : fallbackData,
    }
  )

  return { data, error, isLoading: !data && !error, mutate }
}

export default useGetOfferedServices
