import Autocomplete from "react-google-autocomplete"

export default function CheckOutForm({ userData }: any) {
  return (
    <div>
      <div>
        <h2 className="text-lg font-medium text-gray-900">
          Contact information
        </h2>

        <div className="mt-4">
          <label
            htmlFor="email-address"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="mt-1">
            <input
              type="email"
              id="email-address"
              name="email-address"
              autoComplete="email"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={userData?.username}
              defaultValue=""
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700"
            >
              Full name
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="first-name"
                name="first-name"
                autoComplete="given-name"
                value={userData?.name}
                defaultValue=""
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="phone"
                id="phone"
                autoComplete="tel"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <div className="mt-1">
              <Autocomplete
                aria-required
                apiKey={process.env.NEXT_PUBLIC_GG_API_KEY}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onPlaceSelected={(place: any) => {
                  console.log(JSON.stringify(place?.geometry?.location))
                }}
                options={{
                  types: ["geocode", "establishment"],
                  componentRestrictions: { country: "vn" },
                }}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="note"
              className="block text-sm font-medium text-gray-700"
            >
              Note
            </label>
            <div className="mt-1">
              <textarea
                name="note"
                id="note"
                form="checkout"
                style={{ resize: "none" }}
                rows={5}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
