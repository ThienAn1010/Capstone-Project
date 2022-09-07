import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import HorizontalCard from "./HorizontalCard"
import VerticalCard from "./VerticalCard"

export default function CardSlider({ ppmkers }: any) {
   console.log(ppmkers)
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
      <div className="md:flex md:items-center md:justify-between md:px-2">
        <div className="flex flew-row flex-wrap">
          <h2 className="text-2xl font-semibold text-gray-900">
            Popular papermakers
          </h2>
          {/* <a
            href="#"
            className="text-2xl font-semibold text-test hover:underline hover:text-blue-700"
          >
            {ppmkers[0].service.name}
          </a> */}
        </div>

        <a
          href="#"
          className="hidden text-sm font-medium text-test hover:text-blue-800 md:block"
        >
          View All<span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
      <div className="hidden md:block">
        <Carousel shouldResetAutoplay={false} responsive={responsive} draggable>
          {ppmkers.map((ppmker: any) => (
            <div key={ppmker.id}>
              <VerticalCard ppmker={ppmker} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="block py-4 md:hidden">
        <div className="grid grid-cols-1 gap-4">
          {ppmkers.map((ppmker: any) => (
            <div key={ppmker.id}>
              <HorizontalCard ppmker={ppmker} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 text-sm md:hidden">
        <a href="#" className="font-medium text-test hover:text-indigo-500">
          View all <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </div>
  )
}
