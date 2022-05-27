import type { NextPage } from "next"
import Head from "next/head"
import NavBar from "../components/navbar/NavBar"
import Link from "next/link"
import useGetMe from "../hooks/useGetMe"
import axiosInstance from "../util/axiosInstace"
import Image from "next/image"

const Home: NextPage = () => {
  const { data, isLoading, mutate } = useGetMe()
  const handleLogout = () => {
    mutate(() => axiosInstance.post("/auth/logout").then(() => undefined), {
      optimisticData: undefined,
    })
  }
  const displayContent = () => {
    if (isLoading) return "Loading..."
    if (!data)
      return (
        <Link href="/login">
          <a className="text-white bg-blue-500 px-4 py-2 rounded-sm ">
            Login to proceed
          </a>
        </Link>
      )
    if (data)
      return (
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center gap-x-2">
            <div className="w-8 h-8 relative">
              <Image
                src={data.picture}
                alt="Photo"
                layout="fill"
                className="rounded-full"
              />
            </div>
            <h3 className="text-lg font-semibold tracking-wide">
              Hello {data.name}
            </h3>
          </div>
          <button
            className="text-white bg-blue-500 px-4 py-2 rounded-sm mt-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )
  }
  return (
    <>
      <Head>
        <title>Homepage</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      <main className="mx-auto container">
        <nav className="mt-2 text-center">{displayContent()}</nav>
      </main>
    </>
  )
}

export default Home
