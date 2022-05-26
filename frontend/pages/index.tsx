import type { NextPage } from "next"
import Head from "next/head"
import NavBar from "../components/navbar/NavBar"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Homepage</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
    </>
  )
}

export default Home
