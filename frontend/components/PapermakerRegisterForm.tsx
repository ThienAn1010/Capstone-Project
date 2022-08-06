import { useForm } from "react-hook-form"

const PapermakerRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data: any) => console.log(data)
  // const ref = react.useRef();
  //     const clear = () => {
  //         ref.current.value = "";
  //     };
  //     const handleImageOnChange = (e: any) => {
  //         e.preventDefault();
  //         const file = e.target.files[0];
  //         if (!file) return setImage(null);
  //         console.log(file.size);
  //         if (file.size > 2097152) {
  //             alert("File is too big!");
  //             clear();
  //         } else {
  //             setImage(e.target.files[0]);
  //         }
  //     };
  return (
    <div className="min-h-full flex">
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="signup_img.png"
          alt=""
        />
      </div>
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Become a papermaker
            </h2>
          </div>
          <div className="mt-8">
            <div className="mt-6">
              <form
                action="#"
                method="POST"
                className="space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mt-5"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("email", {required: true ,
                        pattern:
                          /^([a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$)$/,
                      })}
                      name="email"
                      type="text"
                      placeholder="Enter your email"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">Invalid Email!</p>
                    )}
                  </div>
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium text-gray-700 mt-5"
                  >
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("name", {required: true ,
                        pattern: /[^a-zA-Z]/,
                      })}
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">Invalid Name!</p>
                    )}
                  </div>
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium text-gray-700 mt-5"
                  >
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      placeholder="Enter your address"
                      {...register("address", { required: true })}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm">Empty Address!</p>
                    )}
                  </div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mt-5"
                  >
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("phoneNumber", {required: true ,
                        pattern: /^(\s*|\d+)$/,
                      })}
                      type="phone"
                      placeholder="Enter your phone number"
                      autoComplete="phone"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm">
                        Invalid Phone Number!
                      </p>
                    )}
                  </div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("password", { required: true })}
                      type="password"
                      autoComplete="current-password"
                      required
                      placeholder="*******"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">Empty Password!</p>
                    )}
                  </div>

                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("confirmPassword", { required: true })}
                      required
                      placeholder="*******"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm">
                        Not match Password!
                      </p>
                    )}
                  </div>
                  <label className="block text-sm font-medium text-gray-700">
                    Photo
                  </label>
                  <div className="mt-1 flex items-center">
                    <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                      <svg
                        className="h-full w-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                    <button
                      type="button"
                      className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Upload
                    </button>
                  </div>
                  <input
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PapermakerRegisterForm
