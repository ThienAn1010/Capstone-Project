import Card from "./Card"

export default function RoomCardsSlider() {
  let ppmkers = [
    {
      id: "1",
      name: "Nguyen Hoang Thien An",
      type: "Passport",
      price: "$19.99",
      location: "D1, HCMC",
    },
    {
      id: "2",
      name: "Dang Vu Thang",
      type: "Passport",
      price: "$19.99",
      location: "D1, HCMC",
    },
    {
      id: "3",
      name: "Nguyen Bao Ngoc",
      type: "Passport",
      price: "$19.99",
      location: "D1, HCMC",
    },
    {
      id: "4",
      name: "Nguyen Dang Lam Phuong",
      type: "Passport",
      price: "$19.99",
      location: "D1, HCMC",
    },
    {
      id: "5",
      name: "Thien An",
      type: "Passport",
      price: "$19.99",
      location: "D1, HCMC",
    },
  ]

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 sm:py-8 sm:px-6 lg:max-w-full">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Popular papermaker in Marriage Certificate
        </h2>
        <a
          href="#"
          className="hidden text-sm font-medium text-test hover:text-blue-800 md:block"
        >
          View all papermakers<span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
      <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 sm:gap-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl:gap-4">
        {ppmkers.map((ppmker) => (
          <div key={ppmker.id} className="col-span-1">
            <Card ppmker={ppmker} />
          </div>
        ))}
      </div>
      <div className="mt-2 text-sm md:hidden">
        <a href="#" className="font-medium text-test hover:text-indigo-500">
          View all categories<span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </div>
  )
}
