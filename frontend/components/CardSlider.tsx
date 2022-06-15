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
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-12 sm:px-6 lg:max-w-full bg-red-500">
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
      <div className="grid grid-cols-2 justify-items-center lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 xl:gap-2">
        {ppmkers.map((ppmker) => (
          <Card ppmker={ppmker} key={ppmker.id} />
        ))}
      </div>
    </div>
  )
}
