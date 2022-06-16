import Card from "./Card"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

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
      name: "Nguyen Gia Bao",
      type: "Passport",
      price: "$19.99",
      location: "D1, HCMC",
    },
    {
      id: "5",
      name: "Dang Vu Thua",
      type: "Passport",
      price: "$19.99",
      location: "D1, HCMC",
    },
    {
      id: "6",
      name: "Nguyen Van An",
      type: "Passport",
      price: "$19.99",
      location: "D1, HCMC",
    },
    {
      id: "7",
      name: "Le Quang Liem",
      type: "Passport",
      price: "$19.99",
      location: "D1, HCMC",
    },
  ]

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }
  return (
    <div className="max-w-2xl mx-auto py-4 px-4 sm:py-8 sm:px-6 lg:max-w-full">
      <div className="md:flex md:items-center md:justify-between px-2">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Popular papermaker in Passport
        </h2>
        <a
          href="#"
          className="hidden text-sm font-medium text-test hover:text-blue-800 md:block"
        >
          View All<span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
      <Carousel shouldResetAutoplay={false} responsive={responsive} draggable>
        {ppmkers.map((ppmker) => (
          <div key={ppmker.id} className="col-span-1">
            <Card ppmker={ppmker} />
          </div>
        ))}
      </Carousel>
      ;
      <div className="mt-2 text-sm md:hidden">
        <a href="#" className="font-medium text-test hover:text-indigo-500">
          View all <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </div>
  )
}
