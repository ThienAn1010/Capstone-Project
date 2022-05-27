export default function SearchBar() {
  return (
    <div className=" bg-white h-14 w-full rounded-full border border-gray-600 my-auto px-4 py-2  text-gray-400 focus-within:text-gray-600 ">
      <form className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          name="search"
          // This onChange={handleSearchInputChange}
          className="ml-2 w-full bg-white  border-none focus:ring-0"
          placeholder="Search for anything"
        />
      </form>
    </div>
  )
}
