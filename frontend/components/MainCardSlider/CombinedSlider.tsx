import CardSlider from "./CardSlider"

export default function CombinedSlider() {
  const ppmkers_example_1 = [
    {
      id: "1",
      name: "Hoang Thien An",
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
  const ppmkers_example_2 = [
    {
      id: "1",
      name: "Pham Quang Man",
      type: "Marriage Certificate",
      price: "$9.99",
      location: "D3, HCMC",
    },
    {
      id: "2",
      name: "Nguyen Lam Phuong",
      type: "Marriage Certificate",
      price: "$9.99",
      location: "D3, HCMC",
    },
    {
      id: "3",
      name: "Do Thanh Vinh",
      type: "Marriage Certificate",
      price: "$9.99",
      location: "D3, HCMC",
    },
    {
      id: "4",
      name: "Nguyen Van Tu",
      type: "Marriage Certificate",
      price: "$9.99",
      location: "D3, HCMC",
    },
    {
      id: "5",
      name: "Nguyen Dinh Long",
      type: "Marriage Certificate",
      price: "$9.99",
      location: "D3, HCMC",
    },
    {
      id: "6",
      name: "Nguyen Trung Hieu",
      type: "Marriage Certificate",
      price: "$9.99",
      location: "D3, HCMC",
    },
    {
      id: "7",
      name: "Le Quang Dinh",
      type: "Marriage Certificate",
      price: "$9.99",
      location: "D3, HCMC",
    },
  ]
  const ppmkers_example_3 = [
    {
      id: "1",
      name: "Nguyen Minh Anh",
      type: "Driver License",
      price: "$5.99",
      location: "D2, HCMC",
    },
    {
      id: "2",
      name: "Dang Lam Vinh",
      type: "Driver License",
      price: "$5.99",
      location: "D2, HCMC",
    },
    {
      id: "3",
      name: "Nguyen Vu Phuong",
      type: "Driver License",
      price: "$5.99",
      location: "D2, HCMC",
    },
    {
      id: "4",
      name: "Hoang Thien Thang",
      type: "Driver License",
      price: "$5.99",
      location: "D2, HCMC",
    },
    {
      id: "5",
      name: "Nguyen Dinh Hieu",
      type: "Driver License",
      price: "$5.99",
      location: "D2, HCMC",
    },
    {
      id: "6",
      name: "Le Trung Truc",
      type: "Driver License",
      price: "$5.99",
      location: "D2, HCMC",
    },
    {
      id: "7",
      name: "Huynh Thi Le",
      type: "Driver License",
      price: "$5.99",
      location: "D2, HCMC",
    },
  ]
  return (
    <div>
      <CardSlider ppmkers={ppmkers_example_1} />
      <CardSlider ppmkers={ppmkers_example_2} />
      <CardSlider ppmkers={ppmkers_example_3} />
    </div>
  )
}
