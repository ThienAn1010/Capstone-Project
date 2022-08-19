import type { NextPage } from "next"
import { useRouter } from "next/router"
import BookingDetail from "../../../components/DashBoard/BookingDetail"
import LoadingSpinner from "../../../components/LoadingSkeleton/LoadingSpinner"
import useGetMyBooking from "../../../hooks/useGetMyBooking"

const Detail: NextPage = () => {
  const router = useRouter()
  const { data, isLoading } = useGetMyBooking(router.query.id as string)

  return (
    <>
      {isLoading ? (
        <div className="container mx-auto p-20">
          <LoadingSpinner />
        </div>
      ) : (
        <>{data && <BookingDetail booking={data?.booking} />}</>
      )}
    </>
  )
}
export default Detail
