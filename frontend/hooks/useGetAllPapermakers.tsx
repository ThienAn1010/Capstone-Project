import useSWR from "swr"
import axiosInstance from "../util/axiosInstace"

const useGetAllPaperMakers= () => {
  const { data, error, mutate } = useSWR("/offered-services", (url) =>
    axiosInstance.get<any>(url).then((result) => result.data)
  )
  return { data, error, isLoading: !data && !error, mutate }
}

export default useGetAllPaperMakers