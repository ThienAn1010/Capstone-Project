import type { NextPage } from "next";
import Head from "next/head";
import FacebookButton from "../components/FacebookButton";
import GoogleButton from "../components/GoogleButton";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-sm mx-auto">
        <div className="mt-5">
          <h3 className="font-bold text-lg tracking-wide px-5 py-5 border-b text-center">
            Log In to Your Paperwork Account!
          </h3>
          <div className="px-10 mt-5 flex flex-col gap-y-2">
            <GoogleButton />
            <FacebookButton />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;