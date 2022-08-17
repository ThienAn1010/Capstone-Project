import useGetMyService from "../../hooks/useGetMyService"

export default function MyService() {
  const { data } = useGetMyService()
  console.log(data)
  return <>{data ? <div>No Data</div> : <div>Yes data</div>}</>
}
