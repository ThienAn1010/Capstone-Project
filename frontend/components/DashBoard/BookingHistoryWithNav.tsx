import { Fragment } from "react"
import { Tab } from "@headlessui/react"
import useGetUserBooking from "../../hooks/useGetUserBookings"
import BookingHistory from "../../components/DashBoard/BookingHistory"

const navigation = {
    statuses: [
    {
      name: "Pending",
      dataStatus:[
        {value: "pendingConfirm"},
        {value: "pendingFinished"},
      ]
    },
    {
      name: "In progress",
      dataStatus:[
        {value: "accept"},
      ]
    },
    {
      name: "Finished",
      dataStatus:[
        {value: "success"},
      ]
    },
    {
      name: "Canceled",
      dataStatus:[
        {value: "deny"},
        {value: "drop"},
      ]
    },
  ],
}
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function BookingHistoryWithNav() {
  const { data } = useGetUserBooking()
  console.log(data)
  return (
    <div className="divide-y divide-gray-200 lg:col-span-9">
      {/* Links */}
      <Tab.Group as="div" className="mt-2">
        <div className="border-b border-gray-200">
          <Tab.List className="-mb-px flex px-4 space-x-8">
            {navigation.statuses.map((status) => (
              <Tab
                key={status.name}
                className={({ selected }) =>
                  classNames(
                    selected
                      ? "text-indigo-600 border-indigo-600"
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
                {data?.bookings.map((booking) => (
                <BookingHistory booking={booking} key={booking.id} />))}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
