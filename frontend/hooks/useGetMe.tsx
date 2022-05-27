import useSWR from "swr";
import axiosInstance from "../util/axiosInstace";

interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  picture: string;
}

const useGetMe = () => {
  const { data, error, mutate } = useSWR("users/me", url =>
    axiosInstance.get<User>(url).then(result => result.data)
  );
  return { data, error, isLoading: !data && !error, mutate };
};

export default useGetMe;
