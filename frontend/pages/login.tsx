import type { NextPage } from "next"
// import Head from "next/head"
// import FacebookButton from "../components/FacebookButton"
// import GoogleButton from "../components/GoogleButton"

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen bg-gradient-to-bl from-indigo-900 via-blue-400 to-indigo-900 pt-36">
      <div className="container max-w-xl bg-white mx-auto px-12 py-4 rounded-lg shadow-md">
        <h1 className="text-center text-xl subpixel-antialiased font-bold mb-4">
          Login Account
        </h1>
        <div>
          <form className="space-y-4">
            <div className="flex justify-evenly space-x-8 items-center">
              <div className="border border-gray-300 rounded-md px-4 py-2">
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
                  <span className="font-medium text-md hover:cursor-pointer">
                    Login with Facebook
                  </span>
                </div>
              </div>
              <div className="border border-gray-300 rounded-md px-4 py-2">
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
                  <span className="font-medium text-md hover:cursor-pointer">
                    Login with Google
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
              <p className="text-center font-semibold mx-4 mb-0">OR</p>
            </div>
            <div>
              <input
                type="text"
                className="form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                type="password"
                className="form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Password"
              />
            </div>
            <div className="flex justify-between items-center mb-6">
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none focus:ring-0  focus:ring-white transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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
            <button
              type="submit"
              className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home
