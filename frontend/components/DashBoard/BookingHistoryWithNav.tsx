import { Fragment } from "react"
import { Tab } from "@headlessui/react"
import useGetUserBookings from "../../hooks/useGetUserBookings"
import BookingHistory from "../../components/DashBoard/BookingHistory"
import LoadingSpinner from "../LoadingSkeleton/LoadingSpinner"

const navigation = {
  statuses: [
    {
      name: "All",
      key: 1,
    },
    {
      name: "Pending",
      key: 2,
    },
    {
      name: "In Progress",
      key: 3,
    },
    {
      name: "Finished",
      key: 4,
    },
    {
      name: "Cancelled",
      key: 5,
    },
  ],
}
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function BookingHistoryWithNav() {
  const { data, isLoading } = useGetUserBookings()
  console.log(data)
  return (
    <div className="divide-y divide-gray-200 lg:col-span-9">
      {isLoading ? (
        <div className="container mx-auto p-20">
          <LoadingSpinner />
        </div>
      ) : (
        <Tab.Group as="div" className="mt-2">
          <div className="border-b border-gray-200">
            <Tab.List className="-mb-px flex px-4 space-x-8">
              {navigation.statuses.map((status) => (
                <Tab
                  key={status.name}
                  className={({ selected }) =>
                    classNames(
                      selected
                        ? "text-blue-700 border-blue-700 "
                        : "text-gray-900 border-transparent",
                      "flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
                    )
                  }
                >
                  {status.name}
                </Tab>
              ))}
            </Tab.List>
          </div>
          <Tab.Panels as={Fragment}>
            {navigation.statuses.map((status) => (
              <Tab.Panel key={status.name} className="px-4 py-6 space-y-12">
                {status.key == 1 ? (
                  data?.bookings.length == 0 ? (
                    <div className="text-center text-gray-500">
                      <p>No booking placed</p>
                    </div>
                  ) : (
                    data?.bookings.map((booking) => (
                      <BookingHistory booking={booking} key={booking.id} />
                    ))
                  )
                ) : null}
                {status.key == 2 ? (
                  data?.bookings.filter(
                    (booking) => booking.status === "pendingConfirm"
                  ).length == 0 ? (
                    <div className="text-center text-gray-500">
                      <p>No booking placed</p>
                    </div>
                  ) : (
                    data?.bookings.map((booking) =>
                      booking.status == "pendingConfirm" ? (
                        <BookingHistory booking={booking} key={booking.id} />
                      ) : null
                    )
                  )
                ) : null}
                {status.key == 3 ? (
                  data?.bookings.filter(
                    (booking) => booking.status === "accept"
                  ).length == 0 ? (
                    <div className="text-center text-gray-500">
                      <p>No booking placed</p>
                    </div>
                  ) : (
                    data?.bookings.map((booking) =>
                      booking.status == "accept" ? (
                        <BookingHistory booking={booking} key={booking.id} />
                      ) : null
                    )
                  )
                ) : null}
                {status.key == 4 ? (
                  data?.bookings.filter(
                    (booking) => booking.status === "success"
                  ).length == 0 ? (
                    <div className="text-center text-gray-500">
                      <p>No booking placed</p>
                    </div>
                  ) : (
                    data?.bookings.map((booking) =>
                      booking.status == "success" ? (
                        <BookingHistory booking={booking} key={booking.id} />
                      ) : null
                    )
                  )
                ) : null}
                {status.key == 5 ? (
                  data?.bookings.filter(
                    (booking) =>
                      booking.status == "deny" || booking.status == "drop"
                  ).length == 0 ? (
                    <div className="text-center text-gray-500">
                      <p>No booking placed</p>
                    </div>
                  ) : (
                    data?.bookings.map((booking) =>
                      booking.status == "deny" || booking.status == "drop" ? (
                        <BookingHistory booking={booking} key={booking.id} />
                      ) : null
                    )
                  )
                ) : null}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      )}
    </div>
  )
}
