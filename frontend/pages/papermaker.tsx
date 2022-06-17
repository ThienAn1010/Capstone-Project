import type { NextPage } from "next"
import Head from "next/head"
import Feedback from "../components/Feedback"

const PaperMaker: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" mx-auto">
        <div className="mt-5">
          <div className=" mt-5 flex flex-col gap-y-2">
            <Feedback />
          </div>
        </div>
      </main>
    </>
  )
}

export default PaperMaker