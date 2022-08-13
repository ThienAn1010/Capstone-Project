import type { NextPage } from "next"
import {
  BellIcon,
  KeyIcon,
  UserCircleIcon,
  ClipboardListIcon,
} from "@heroicons/react/outline"
import useGetMe from "../../hooks/useGetMe"
import { useRouter } from "next/router"
import ProfileForm from "../../components/DashBoard/ProfileForm"
import BookingHistory from "../../components/DashBoard/BookingHistory"
import BookingHistoryTest from "../../components/DashBoard/BookingHistoryTest"
import HeaderDisclosure from "../../components/DashBoard/HeaderDisclosure"
import React, { Suspense } from "react"

const ErrorComponent = React.lazy(
  () => import("../../components/ErrorComponent")
)

const subNavigation = [
  { name: "Profile", href: "profile", icon: UserCircleIcon, current: true },
  {
    name: "Booked Services",
    href: "service",
    icon: ClipboardListIcon,
    current: false,
  },
  { name: "Password", href: "password", icon: KeyIcon, current: false },
  {
    name: "Notifications",
    href: "notification",
    icon: BellIcon,
    current: false,
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

const Profile: NextPage = () => {
  const { data } = useGetMe()
  const router = useRouter()
  const query = { ...router.query }
  const viewable = data && data.id === query.id
  return (
    <>
      {viewable ? (
        <div>
          <HeaderDisclosure />
          <main className="relative -mt-32">
            <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
                  <aside className="py-6 lg:col-span-3">
                    <nav className="space-y-1">
                      {subNavigation.map((item) => (
                        <p
                          key={item.name}
                          className={classNames(
                            item.current
                              ? "bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700"
                              : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                            "group border-l-4 px-3 py-2 flex items-center text-sm font-medium hover:cursor-pointer"
                          )}
                          aria-current={item.current ? "page" : undefined}
                          onClick={async () => {
                            delete query.page
                            await router.replace(
                              {
                                query: {
                                  ...query,
                                  tab: item.href,
                                },
                              },
                              undefined,
                              {
                                shallow: true,
                              }
                            )
                          }}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-teal-500 group-hover:text-teal-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          <span className="truncate">{item.name}</span>
                        </p>
                      ))}
                    </nav>
                  </aside>
                  {query.tab === "profile" || query.tab === undefined ? (
                    <ProfileForm data={data} />
                  ) : null}
                  {query.tab === "service" ? (
                    <BookingHistoryTest/>
                  ) : null}
                  {/* {query.tab === "service" ? <div><BookingHistoryTest></BookingHistoryTest></div> : null} */}
                  {query.tab === "password" ? <div>Hello password</div> : null}
                  {query.tab === "notification" ? <div>noti</div> : null}
                </div>
              </div>
            </div>
          </main>
        </div>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <ErrorComponent />
        </Suspense>
      )}
    </>
  )
}
export default Profile
