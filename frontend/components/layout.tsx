import { useRouter } from "next/router"
import useGetMe from "../hooks/useGetMe"
import NavBarLog from "./NavBar/NavBarLog"
import NavBarNoLog from "./NavBar/NavBarNoLog"

export default function Layout({ children }: any) {
  const { data } = useGetMe()
  const { pathname } = useRouter()
  const hideNav = pathname.includes("/login") || pathname.includes("/register")
  console.log(hideNav)

  return (
    <>
      {hideNav ? (
        <main>{children}</main>
      ) : (
        <>
          {data ? <NavBarLog data={data} /> : <NavBarNoLog />}
          <main>{children}</main>
        </>
      )}
    </>
  )
}
