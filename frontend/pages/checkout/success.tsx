import type { NextPage } from "next"
import Head from "next/head"
import ThankYou from "../../components/ThankYou"

const Success: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Thank You</title>
      </Head>

      <ThankYou />
    </>
  )
}

export default Success
