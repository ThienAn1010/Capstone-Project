import type { NextPage } from "next"
import { useRouter } from "next/router"
import useGetUserBookings from "../../../hooks/useGetUserBookings"
import BookingDetail from "../../../components/DashBoard/BookingDetail"
import LoadingSpinner from "../../../components/LoadingSkeleton/LoadingSpinner"

const Detail: NextPage = () => {
  const router = useRouter()
  const { data, isLoading } = useGetUserBookings()
  const id = router.query.id
  console.log(data)
  return (
    <>
      {isLoading ? (
        <div className="container mx-auto p-20">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {data?.bookings.map((booking) =>
            booking.id == id ? <BookingDetail booking={booking} /> : null
          )}
        </>
      )}
    </>
  )
}
export default Detail
