import { FC } from "react"

const CheckOutLoader: FC = () => {
  return (
    <main className="bg-checkout">
      <div className="max-w-7xl mx-auto pt-14 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <h1 className="sr-only">Checkout</h1>
          <form
            id="checkout"
            className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
          >
            <div className="animate-pulse">
              <div>
                <div className="h-4 w-[19ch] bg-gray-300 rounded"></div>

                <div className="mt-4">
                  <div className="h-3 w-[13ch] bg-gray-300 rounded"></div>
                  <div className="mt-1">
                    <div className="h-8 w-full bg-gray-300 rounded"></div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <div className="h-3 w-[8ch] bg-gray-300 rounded"></div>

                    <div className="mt-1">
                      <div className="h-8 w-full bg-gray-300 rounded"></div>
                    </div>
                  </div>

                  <div>
                    <div className="h-3 w-[5ch] bg-gray-300 rounded"></div>
                    <div className="mt-1">
                      <div className="h-8 w-full bg-gray-300 rounded"></div>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <div className="h-3 w-[7ch] bg-gray-300 rounded"></div>

                    <div className="mt-1">
                      <div className="h-8 w-full bg-gray-300 rounded"></div>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="h-3 w-[4ch] bg-gray-300 rounded"></div>

                    <div className="mt-1">
                      <div className="h-20 w-full bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="animate-pulse mt-10 lg:mt-0">
              <div className="h-4 w-[13ch] bg-gray-300 rounded"></div>
              <div className="mt-4 h-60 w-full bg-gray-300 rounded"></div>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default CheckOutLoader
