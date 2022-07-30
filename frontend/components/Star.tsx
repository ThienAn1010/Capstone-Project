import { FC } from "react"
import { StarIcon as StarIconOutline } from "@heroicons/react/outline"
import { StarIcon as StarIconSolid } from "@heroicons/react/solid"
interface StarProps {
  rating: number
}
const stars = Array(5)
  .fill(0)
  .map((_, i) => i + 1)

const Star: FC<StarProps> = ({ rating }) => {
  return (
    <div className="flex">
      {stars.map((star) =>
        star <= rating ? (
          <StarIconSolid key={star} className="w-3 h-3 text-yellow-400" />
        ) : (
          <StarIconOutline key={star} className="w-3 h-3 text-yellow-400" />
        )
      )}
    </div>
  )
}

export default Star
