import type { NextPage } from "next"
import {
  BellIcon,
  UserCircleIcon,
  ClipboardListIcon,
  ClipboardCheckIcon,
} from "@heroicons/react/outline"
import useGetMe from "../../hooks/useGetMe"
import { useRouter } from "next/router"
import ProfileForm from "../../components/DashBoard/ProfileForm"
import BookingHistoryWithNav from "../../components/DashBoard/BookingHistoryWithNav"
import HeaderDisclosure from "../../components/DashBoard/HeaderDisclosure"
import React, { Suspense } from "react"
import LoadingSpinner from "../../components/LoadingSkeleton/LoadingSpinner"
import MyService from "../../components/DashBoard/MyService"
import BookingManager from "../../components/DashBoard/BookingManager"

const ErrorComponent = React.lazy(
  () => import("../../components/ErrorComponent")
)

const userSubNavigation = [
  { name: "Profile", href: "profile", icon: UserCircleIcon },
  {
    name: "Booked Services",
    href: "service",
    icon: ClipboardCheckIcon,
  },
]

const ppmkerSubNavigation = [
  { name: "Profile", href: "profile", icon: UserCircleIcon },
  {
    name: "My Service",
    href: "myservice",
    icon: BellIcon,
  },
  {
    name: "Booking Manager",
    href: "manager",
    icon: ClipboardListIcon,
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

const Profile: NextPage = () => {
  const { data, isLoading } = useGetMe()
  const router = useRouter()
  const query = { ...router.query }
  const viewable = data && data.id === query.id
  const tab = router.query.tab
  return (
    <>
      {isLoading ? (
        <div className="container mx-auto p-20">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {viewable ? (
            <div>
              <HeaderDisclosure />
              <main className="relative -mt-32">
                <div className="max-w-screen-2xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
                  <div className=" bg-white rounded-lg shadow overflow-hidden">
                    <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
                      <aside className="py-6 lg:col-span-3">
                        {data.role === "user" ? (
                          <nav className="space-y-1">
                            {userSubNavigation.map((item) => (
                              <p
                                key={item.name}
                                className={classNames(
                                  tab === item.href
                                    ? "bg-blue-50 border-blue-500 text-blue-700 hover:bg-blue-50 hover:text-blue-700"
                                    : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                                  "group border-l-4 px-3 py-2 flex items-center text-sm font-medium hover:cursor-pointer"
                                )}
                                aria-current={
                                  tab === item.href ? "page" : undefined
                                }
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
                                    tab === item.href
                                      ? "text-blue-500 group-hover:text-blue-500"
                                      : "text-gray-400 group-hover:text-gray-500",
                                    "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                                  )}
                                  aria-hidden="true"
                                />
                                <span className="truncate">{item.name}</span>
                              </p>
                            ))}
                          </nav>
                        ) : (
                          <nav className="space-y-1">
                            {ppmkerSubNavigation.map((item) => (
                              <p
                                key={item.name}
                                className={classNames(
                                  tab === item.href
                                    ? "bg-blue-50 border-blue-500 text-blue-700 hover:bg-blue-50 hover:text-blue-700"
                                    : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                                  "group border-l-4 px-3 py-2 flex items-center text-sm font-medium hover:cursor-pointer"
                                )}
                                aria-current={
                                  tab === item.href ? "page" : undefined
                                }
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
                                    tab === item.href
                                      ? "text-blue-500 group-hover:text-blue-500"
                                      : "text-gray-400 group-hover:text-gray-500",
                                    "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                                  )}
                                  aria-hidden="true"
                                />
                                <span className="truncate">{item.name}</span>
                              </p>
                            ))}
                          </nav>
                        )}
                      </aside>
                      {query.tab === "profile" || query.tab === undefined ? (
                        <ProfileForm />
                      ) : null}
                      {query.tab === "service" && data.role === "user" ? (
                        <BookingHistoryWithNav />
                      ) : null}
                      {query.tab === "manager" && data.role === "paperMaker" ? (
                        <BookingManager />
                      ) : null}
                      {query.tab === "myservice" &&
                      data.role === "paperMaker" ? (
                        <MyService />
                      ) : null}
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
      )}
    </>
  )
}
export default Profile
