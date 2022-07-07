import type { NextPage } from "next"
import Head from "next/head"
import MainCarousel from "../components/MainCarousel"
import Category from "../components/Category"
// import NavBar from "../components/navbar/NavBar"
// import Link from "next/link"
import useGetMe from "../hooks/useGetMe"
// import axiosInstance from "../util/axiosInstace"
// import Image from "next/image"
import NavBarNoLog from "../components/navbar/NavBarNoLog"
import CombinedSlider from "../components/MainCardSlider/CombinedSlider"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import axiosInstance from "../util/axiosInstace"
import NavBarLog from "../components/navbar/NavBarLog"

const Home: NextPage = () => {
  const router = useRouter()
  const { code, scope } = router.query
  const { data, mutate } = useGetMe()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let controller: AbortController | undefined
    const loginWithSocialMedia = async () => {
      if (!code) return
      try {
        controller = new AbortController()
        setLoading(true)
        const response = await axiosInstance.post(
          "/auth/social",
          {
            code,
            type: scope ? "google" : "facebook",
          },
          { signal: controller.signal }
        )
        mutate(undefined, {
          optimisticData: response.data.user,
        })
      } catch (error) {
        console.log(error)
      }
      await router.replace("/")
      setLoading(false)
    }
    loginWithSocialMedia()
    return () => controller?.abort()
  }, [code, scope, mutate, router])

  return (
    <>
      <Head>
        <title>Homepage</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {loading && (
        <div className="fixed top-0 left-0 bg-slate-700 w-full h-full opacity-80 z-10 overflow-hidden flex items-center justify-center">
          <svg
            role="status"
            className="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-900 fill-blue-700"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}

      {data ? <NavBarLog data={data} /> : <NavBarNoLog />}
      <MainCarousel />
      <main className="mx-auto container">
        <Category />
        <CombinedSlider />
      </main>
    </>
  )
}

export default Home

// const { data, isLoading, mutate } = useGetMe()
// const handleLogout = () => {
//   mutate(() => axiosInstance.post("/auth/logout").then(() => undefined), {
//     optimisticData: undefined,
//   })
// }
// const displayContent = () => {
//   if (isLoading) return "Loading..."
//   if (!data)
//     return (
//       <Link href="/login">
//         <a className="text-white bg-blue-500 px-4 py-2 rounded-sm ">
//           Login to proceed
//         </a>
//       </Link>
//     )
//   if (data)
//     return (
//       <div className="flex flex-col items-center">
//         <div className="flex justify-center items-center gap-x-2">
//           <div className="w-8 h-8 relative">
//             <Image
//               src={data.picture}
//               alt="Photo"
//               layout="fill"
//               className="rounded-full"
//             />
//           </div>
//           <h3 className="text-lg font-semibold tracking-wide">
//             Hello {data.name}
//           </h3>
//         </div>
//         <button
//           className="text-white bg-blue-500 px-4 py-2 rounded-sm mt-2"
//           onClick={handleLogout}
//         >
//           Logout
//         </button>
//       </div>
//     )
// }
