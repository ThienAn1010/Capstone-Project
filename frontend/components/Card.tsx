import Link from "next/link"
import { FC } from "react"
import { OfferedService } from "../types/OfferedService"
import Star from "./Star"
interface CardProps {
  offeredService: OfferedService
}

const Card: FC<CardProps> = ({ offeredService }) => {
  return (
    <Link href={`/service/${offeredService.id}`}>
      <a>
        <div className="pb-3 border-b border-b-[#d1d7dc] relative">
          <div className="flex justify-start items-start">
            <div className="mr-2">
              <img
                className="w-[260px] h-[145px] object-cover"
                alt="Something"
                src="https://images.smartcapitalmind.com/person-using-pen-near-documents-and-chart.jpg"
              />
            </div>
            <div className="text-gray-500 text-sm pr-20 flex-1">
              <h3 className="font-bold text-lg text-gray-900">
                {offeredService.paperMaker.user.name} -{" "}
                {offeredService.service.name}
              </h3>
              <div className="flex text-xs mb-1">Ho Chi Minh City</div>
              <p className="line-clamp-2">
                The best service only available on PaperWork, and task will be
                finished within 7 days. The service ensure quality and fastest
                in the whole system
              </p>
              <div className="flex text-xs items-baseline gap-x-1">
                <span className="text-base text-[#b4690e] font-semibold flex">
                  {offeredService.paperMaker.rating}
                </span>
                <div className="flex">
                  <Star rating={offeredService.paperMaker.rating} />
                </div>
                <span className="flex text-gray-500">100 reviews</span>
              </div>
              <div className="flex gap-x-1 items-baseline ">
                <span className="text-xs">Number of purchases: </span>
                <span className="font-bold text-base">
                  {offeredService.paperMaker.totalCases}
                </span>
              </div>
              <div className="flex gap-x-1 items-baseline ">
                <span className="text-xs">Duration: </span>
                <span className="font-bold text-base">
                  {offeredService.duration} days
                </span>
              </div>
            </div>
            <div className="font-bold text-lg text-gray-900 absolute top-o right-0">
              ${offeredService.price}
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Card
