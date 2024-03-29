import { useRouter } from "next/router"
import useGetMe from "../hooks/useGetMe"
import NavBarNoLog from "./navbar/NavBarNoLog"
import NavBarLog from "./navbar/NavBarLog"
import Footer from "./Footer"

export default function Layout({ children }: any) {
  const { data } = useGetMe()
  const { pathname } = useRouter()
  const hideNav = pathname.includes("/login") || pathname.includes("/register")

  return (
    <>
      {hideNav ? (
        <main>{children}</main>
      ) : (
        <>
          {data ? <NavBarLog data={data} /> : <NavBarNoLog />}
          <main>{children}</main>
          <Footer />
        </>
      )}
    </>
  )
}
