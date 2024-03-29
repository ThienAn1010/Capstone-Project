import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import LoginFacebookButton from "../components/LoginButton/LoginFacebookButton"
import LoginGoogleButton from "../components/LoginButton/LoginGoogleButton"
import { getFacebookOAuthUrl, getGoogleOAuthUrl } from "../util/socialLogin"
import { useForm } from "react-hook-form"
import axiosInstance from "../util/axiosInstace"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/router"

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    const loginUser = (async () => {
      const response = await axiosInstance.post("/auth/login", {
        username: data.username,
        password: data.password,
      })
      return response
    })()
    toast.promise(
      loginUser,
      {
        loading: "Processing...",
        error: (error) => {
          console.log(error)
          setIsLoading(false)
          if (error.response.status === 404 || error.response.status === 400) {
            return error.response.data.message
          }
          return "Something went wrong. Try again later !!!"
        },
        success: () => {
          setIsLoading(false)
          router.push("/")
          return "Successfully logged in"
        },
      },
      {
        position: "bottom-center",
      }
    )
  }

  return (
    <>
      <Head>
        <title>Login Page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-screen min-h-screen bg-gradient-to-bl from-test via-sky-400 to-test pt-8 px-4 py-4 md:pt-36 ">
        <div className="container max-w-2xl bg-white mx-auto px-6 py-4 md:px-12 md:py-8 rounded-lg shadow-md">
          <h1 className="text-center text-xl subpixel-antialiased font-bold md:mb-6 md:text-2xl">
            Login Guest Account
          </h1>
          <div>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="hidden md:flex justify-around space-x-8 items-center">
                <Link href={getFacebookOAuthUrl()}>
                  <a className="border border-gray-300 rounded-md px-4 py-2 ">
                    <div className="flex justify-center space-x-2 items-center">
                      <svg
                        fill="currentColor"
                        className="h-7 w-7"
                        stroke="unset"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M44,38.44A5.56,5.56,0,0,1,38.44,44H9.56A5.56,5.56,0,0,1,4,38.44V9.56A5.56,5.56,0,0,1,9.56,4H38.44A5.56,5.56,0,0,1,44,9.56Z"
                          fill="#3f51b5"
                        ></path>
                        <path
                          d="M35.52,25.11H31.78V39.56H26.22V25.11H22.89V20.67h3.33V18c0-3.9,1.62-6.21,6.22-6.21h3.78v4.44H33.68c-1.79,0-1.91.67-1.91,1.91v2.53h4.44Z"
                          fill="#fff"
                        ></path>
                      </svg>
                      <span className="font-medium text-lg hover:cursor-pointer">
                        Login with Facebook
                      </span>
                    </div>
                  </a>
                </Link>
                <Link href={getGoogleOAuthUrl()}>
                  <a className="border border-gray-300 rounded-md px-4 py-2 ">
                    <div className="flex justify-center space-x-2 items-center">
                      <svg
                        fill="currentColor"
                        className="h-7 w-7"
                        stroke="unset"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                      >
                        <path
                          fill="#FFC107"
                          d="M 43.609375 20.082031 L 42 20.082031 L 42 20 L 24 20 L 24 28 L 35.304688 28 C 33.652344 32.65625 29.222656 36 24 36 C 17.371094 36 12 30.628906 12 24 C 12 17.371094 17.371094 12 24 12 C 27.058594 12 29.84375 13.152344 31.960938 15.039063 L 37.617188 9.382813 C 34.046875 6.054688 29.269531 4 24 4 C 12.953125 4 4 12.953125 4 24 C 4 35.046875 12.953125 44 24 44 C 35.046875 44 44 35.046875 44 24 C 44 22.660156 43.863281 21.351563 43.609375 20.082031 Z "
                        ></path>
                        <path
                          fill="#FF3D00"
                          d="M 6.304688 14.691406 L 12.878906 19.511719 C 14.65625 15.109375 18.960938 12 24 12 C 27.058594 12 29.84375 13.152344 31.960938 15.039063 L 37.617188 9.382813 C 34.046875 6.054688 29.269531 4 24 4 C 16.316406 4 9.65625 8.335938 6.304688 14.691406 Z "
                        ></path>
                        <path
                          fill="#4CAF50"
                          d="M 24 44 C 29.164063 44 33.859375 42.023438 37.410156 38.808594 L 31.21875 33.570313 C 29.210938 35.089844 26.714844 36 24 36 C 18.796875 36 14.382813 32.683594 12.71875 28.054688 L 6.195313 33.078125 C 9.503906 39.554688 16.226563 44 24 44 Z "
                        ></path>
                        <path
                          fill="#1976D2"
                          d="M 43.609375 20.082031 L 42 20.082031 L 42 20 L 24 20 L 24 28 L 35.304688 28 C 34.511719 30.238281 33.070313 32.164063 31.214844 33.570313 C 31.21875 33.570313 31.21875 33.570313 31.21875 33.570313 L 37.410156 38.808594 C 36.972656 39.203125 44 34 44 24 C 44 22.660156 43.863281 21.351563 43.609375 20.082031 Z "
                        ></path>
                      </svg>
                      <span className="font-medium text-lg hover:cursor-pointer">
                        Login with Google
                      </span>
                    </div>
                  </a>
                </Link>
              </div>
              <div className="space-y-2 md:hidden">
                <LoginFacebookButton />
                <LoginGoogleButton />
              </div>
              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center font-semibold mx-4 mb-0">OR</p>
              </div>
              <h1 className="text-center text-xl subpixel-antialiased font-bold md:mb-6 md:text-2xl">
                Login Papermaker Account
              </h1>
              <div>
                <label
                  htmlFor="username"
                  className="block text-md font-medium text-gray-700 mt-5"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    {...register("username", {
                      required: {
                        value: true,
                        message: "Username is required",
                      },
                      pattern: {
                        value: /^([a-zA-Z0-9]+@(?:[a-zA-Z0-9]+.)+[A-Za-z]+$)$/,
                        message: "Username is in invalid format",
                      },
                    })}
                    placeholder="Enter your email"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.username.message as any}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-md font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                    })}
                    type="password"
                    placeholder="*******"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message as any}
                    </p>
                  )}
                </div>
              </div>
              <div className="hidden md:flex justify-between items-center mb-6">
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="hidden md:block form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none focus:ring-0  focus:ring-white transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    id="exampleCheck3"
                  />
                  <label
                    className="form-check-label inline-block text-gray-800"
                    htmlFor="exampleCheck3"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#!"
                  className="text-blue-600 italic hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                >
                  Forgot password?
                </a>
              </div>
              <div className="block text-right md:hidden mb-6">
                <a
                  href="#!"
                  className="text-blue-600 italic hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Sign In"}
              </button>
              <div className="flex justify-center">
                <p className="opacity-75">Become a papermaker?&nbsp;</p>
                <Link href="/register">
                  <p className="opacity-75 text-blue-600 hover:text-blue-700 focus:text-blue-700 hover:cursor-pointer hover:underline hover:underline-offset-2">
                    Sign up
                  </p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
