import type { NextPage } from "next"
import { useRouter } from "next/router"
import useGetUserBookings from "../../../hooks/useGetUserBookings"
import BookingDetail from "../../../components/DashBoard/BookingDetail"

const Detail: NextPage = () => {
  const router = useRouter()
  const { data, isLoading } = useGetUserBookings()
  console.log(data)
  return (
    // <>
    //   {isLoading ? (
    //     <DetailLoader />
    //   ) : (
      <>
      {data?.bookings.map((booking) =>
         booking.id == router.query.id ? (
          <BookingDetail booking={booking}/>
         ):null
      )}
      {/* )} */}
     </>
  )
}
export default Detail
