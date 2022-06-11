import { Swiper, SwiperSlide } from "swiper/react"
import { Lazy, Pagination, Navigation } from "swiper"
import "swiper/css"
import "swiper/css/lazy"
import "swiper/css/pagination"
import "swiper/css/navigation"
import Image from "next/image"

export default function MainCarousel() {
  return (
    <Swiper
      slidesPerView={1}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      modules={[Lazy, Pagination, Navigation]}
      lazy={true}
      className="mt-6"
    >
      <SwiperSlide className="bg-red-700">
        <div style={{ position: "relative", width: "100vw", height: "40vh" }}>
          <Image
            alt="Carousel Images"
            src="/test2.jpg"
            layout="fill"
            quality={100}
            objectFit="cover"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide></SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
  )
}
