import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

export default function MainCarousel() {
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 1,
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0,
      },
      items: 1,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464,
      },
      items: 1,
    },
  }
  return (
    <div className="">
      <Carousel
        autoPlay={true}
        responsive={responsive}
        additionalTransfrom={0}
        arrows={false}
        autoPlaySpeed={3000}
        swipeable
        showDots
      >
        <div>
          <img
            src="https://source.unsplash.com/x3voiJL-PfY"
            alt="carousel image"
            className="object-cover object-top w-full md:object-center sm:h-80 md:h-96 lg:h-[32rem] xl:h-[38rem]"
          />
        </div>
        <div>
          <img
            src="https://source.unsplash.com/wgcUx0kR1ps"
            alt="carousel image"
            className="object-cover object-top w-full md:object-center sm:h-80 md:h-96 lg:h-[32rem] xl:h-[38rem]"
          />
        </div>
        <div>
          <img
            src="https://source.unsplash.com/g1Kr4Ozfoac"
            alt="carousel image"
            className="object-cover object-top w-full md:object-center sm:h-80 md:h-96 lg:h-[32rem] xl:h-[38rem]"
          />
        </div>
        <div>
          <img
            src="https://source.unsplash.com/376KN_ISplE"
            alt="carousel image"
            className="object-cover object-top w-full md:object-center sm:h-80 md:h-96 lg:h-[32rem] xl:h-[38rem]"
          />
        </div>
        <div>
          <img
            src="https://source.unsplash.com/OQMZwNd3ThU/2400x1601"
            alt="carousel image"
            className="object-cover object-top w-full md:object-center sm:h-80 md:h-96 lg:h-[32rem] xl:h-[38rem]"
          />
        </div>
      </Carousel>
    </div>
  )
}
