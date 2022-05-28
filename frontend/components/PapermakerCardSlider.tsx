import Carousel from "react-grid-carousel"
import Card from "./Card"

export default function RoomCardsSlider() {
  let ppmkers = [
    {
      id: "1",
      name: "Thien An",
      type: "Passport",
      price: "$19.99",
      location: "D1, HCMC",
    },
    {
      id: "2",
      name: "Thien An",
      type: "Passport",
      price: "$19.99",
      location: "D1, HCMC",
    },
    {
      id: "3",
      name: "Thien An",
      type: "Passport",
      price: "$19.99",
      location: "D1, HCMC",
    },
    {
      id: "4",
      name: "Thien An",
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
    {
      id: "6",
      name: "Thien An",
      type: "Passport",
      price: "$19.99",
      location: "D1, HCMC",
    },
    {
      id: "7",
      name: "Thien An",
      type: "Passport",
      price: "$19.99",
      location: "D1, HCMC",
    },
    {
      id: "8",
      name: "Thien An",
      type: "Passport",
      price: "$19.99",
      location: "D1, HCMC",
    },
  ]
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
      {ppmkers.map((ppmaker) => (
        <Carousel.Item key={ppmaker.id}>
          <Card key={ppmaker.id} ppmker={ppmaker} />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}
