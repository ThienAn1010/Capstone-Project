import CardSlider from "./CardSlider"

export default function CombinedSlider() {
  const ppmkers_example_1 = [
    {
      id: "1000",
      name: "Hoang Thien An",
      type: "Passport",
      price: "$19.99",
      location: "D1, HCMC",
    },
    {
      id: "1001",
      name: "Dang Vu Thang",
      type: "Passport",
      price: "$19.99",
      location: "D1, HCMC",
    },
    {
      id: "1002",
      name: "Nguyen Bao Ngoc",
      type: "Passport",
      price: "$19.99",
      location: "D1, HCMC",
    },
    {
      id: "1003",
      name: "Nguyen Gia Bao",
      type: "Passport",
      price: "$19.99",
      location: "D1, HCMC",
    },
    {
      id: "1004",
      name: "Dang Vu Thua",
      type: "Passport",
      price: "$19.99",
      location: "D1, HCMC",
    },
    {
      id: "1005",
      name: "Nguyen Van An",
      type: "Passport",
      price: "$19.99",
      location: "D1, HCMC",
    },
    {
      id: "1006",
      name: "Le Quang Liem",
      type: "Passport",
      price: "$19.99",
      location: "D1, HCMC",
    },
  ]
  const ppmkers_example_2 = [
    {
      id: "1007",
      name: "Pham Quang Man",
      type: "Marriage Certificate",
      price: "$9.99",
      location: "D3, HCMC",
    },
    {
      id: "1008",
      name: "Nguyen Lam Phuong",
      type: "Marriage Certificate",
      price: "$9.99",
      location: "D3, HCMC",
    },
    {
      id: "1009",
      name: "Do Thanh Vinh",
      type: "Marriage Certificate",
      price: "$9.99",
      location: "D3, HCMC",
    },
    {
      id: "1010",
      name: "Nguyen Van Tu",
      type: "Marriage Certificate",
      price: "$9.99",
      location: "D3, HCMC",
    },
    {
      id: "1011",
      name: "Nguyen Dinh Long",
      type: "Marriage Certificate",
      price: "$9.99",
      location: "D3, HCMC",
    },
    {
      id: "1012",
      name: "Nguyen Trung Hieu",
      type: "Marriage Certificate",
      price: "$9.99",
      location: "D3, HCMC",
    },
    {
      id: "1013",
      name: "Le Quang Dinh",
      type: "Marriage Certificate",
      price: "$9.99",
      location: "D3, HCMC",
    },
  ]
  const ppmkers_example_3 = [
    {
      id: "1014",
      name: "Nguyen Minh Anh",
      type: "Driver License",
      price: "$5.99",
      location: "D2, HCMC",
    },
    {
      id: "1015",
      name: "Dang Lam Vinh",
      type: "Driver License",
      price: "$5.99",
      location: "D2, HCMC",
    },
    {
      id: "1016",
      name: "Nguyen Vu Phuong",
      type: "Driver License",
      price: "$5.99",
      location: "D2, HCMC",
    },
    {
      id: "1017",
      name: "Hoang Thien Thang",
      type: "Driver License",
      price: "$5.99",
      location: "D2, HCMC",
    },
    {
      id: "1018",
      name: "Nguyen Dinh Hieu",
      type: "Driver License",
      price: "$5.99",
      location: "D2, HCMC",
    },
    {
      id: "1019",
      name: "Le Trung Truc",
      type: "Driver License",
      price: "$5.99",
      location: "D2, HCMC",
    },
    {
      id: "1020",
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
