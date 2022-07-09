import React, { useEffect, useRef, useState } from "react"
import { CheckIcon } from "@heroicons/react/outline"
const serviceDetails = [
  "Deliver within 7 working days",
  "Real-time progress tracking",
  "Cancel at any given time",
  "Secure transaction",
  "Support 24/7",
]

const BookNow = () => {
  const element = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(() => {})
    intersectionObserver.observe(element.current!)
    return () => intersectionObserver.disconnect()
  }, [])
  return (
    <div
      className={`max-w-xs shadow-md p-5 rounded-sm overflow-hidden block transition`}
      ref={element}
    >
      <div className="-mx-5 -mt-5 relative">
        <div className="w-full h-full absolute bg-gray-400 opacity-40 z-0"></div>
        <img
          src="https://images.smartcapitalmind.com/person-using-pen-near-documents-and-chart.jpg"
          className="w-full h-full"
          alt="Avatar"
        />
      </div>
      <h3 className="text-3xl font-bold mt-3">$23</h3>
      <button className="w-full bg-blue-500 text-white mt-1.5 py-1">
        Book now
      </button>
      {/* <p className="text-sm text-center my-2 text-gray-500">
        Cancel at any time
      </p> */}
      <h4 className="font-medium mt-5">The service includes</h4>
      <ul className="text-sm space-y-1.5 mt-1">
        {serviceDetails.map((detail) => (
          <div key={detail} className="flex items-center gap-x-2">
            <CheckIcon className="font-medium w-4 h-4 text-blue-500" />
            <li>{detail}</li>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default BookNow
