import Carousel from "react-grid-carousel"

export default function RoomCardsSlider() {
  return (
    <Carousel
      cols={5}
      responsiveLayout={[
        {
          breakpoint: 1600,
          cols: 5,
          rows: 1,
          gap: 10,
          loop: true,
        },
        {
          breakpoint: 1280,
          cols: 4,
          rows: 1,
          gap: 10,
          loop: true,
        },
        {
          breakpoint: 1100,
          cols: 3,
          rows: 1,
          gap: 10,
          loop: true,
        },
        {
          breakpoint: 768,
          cols: 2,
          rows: 1,
          gap: 10,
          loop: true,
        },
      ]}
    >
      {/* {data.data.rooms.map((room) => (
        <Carousel.Item key={room._id}>
          <Card key={room._id} props={room} />
        </Carousel.Item>
      ))} */}
    </Carousel>
  )
}
