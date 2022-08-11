import type { NextPage } from "next"
import { useRouter } from "next/router"
import React, { Suspense } from "react"
import CheckOutLoader from "../../../../components/LoadingSkeleton/checkOutLoader"
import useGetMe from "../../../../hooks/useGetMe"
import useGetOfferedService from "../../../../hooks/useGetOfferedService"

const CheckOutForm = React.lazy(
  () => import("../../../../components/CheckOut/CheckOutForm")
)
const CheckOutSummary = React.lazy(
  () => import("../../../../components/CheckOut/CheckOutSummary")
)

const Checkout: NextPage = () => {
  const router = useRouter()
  const id = router.query.id
  const { data: userData, isLoading: userLoading } = useGetMe()
  const { data: serviceData, isLoading: serviceLoading } = useGetOfferedService(
    id as string
  )
  const isLoading = userLoading || serviceLoading
  return (
    <>
      <Suspense fallback={<CheckOutLoader />}>
        {isLoading ? (
          <CheckOutLoader />
        ) : (
          <>
            <main className="bg-checkout">
              <div className="max-w-7xl mx-auto pt-14 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto lg:max-w-none">
                  <h1 className="sr-only">Checkout</h1>
                  <form
                    id="checkout"
                    className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
                  >
                    <CheckOutForm userData={userData} />
                    <CheckOutSummary serviceData={serviceData} />
                  </form>
                </div>
              </div>
            </main>
          </>
        )}
      </Suspense>
    </>
  )
}

export default Checkout
