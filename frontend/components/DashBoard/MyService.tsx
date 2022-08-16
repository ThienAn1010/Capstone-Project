// import useGetMyService from "../../hooks/useGetMyService"

import CreateServiceForm from "./CreateServiceForm"

export default function MyService() {
  // const { data } = useGetMyService()
  // console.log(data)

  const data = false
  return <>{data ? <div>Yes data</div> : <CreateServiceForm />}</>
}
