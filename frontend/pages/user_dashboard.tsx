import type { NextPage } from "next"
import Head from "next/head"
import UserDashboard from "../components/UserDashboard"
import NavBarNoLog from '../components/navbar/NavBarNoLog';

const User_Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBarNoLog />
      <main className=" mx-auto">
        <div className="mt-5">
          <div className=" mt-5 flex flex-col gap-y-2">
            <UserDashboard />
          </div>
        </div>
      </main>
    </>
  )
}

export default User_Dashboard