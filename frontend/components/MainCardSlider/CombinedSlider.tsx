import CardSlider from "./CardSlider"
import useGetAllPaperMakers from "../../hooks/useGetAllPapermakers"
import LoadingSpinner from "../LoadingSkeleton/LoadingSpinner"

export default function CombinedSlider() {
  const { data, isLoading } = useGetAllPaperMakers()

  return (
    <div>
      {isLoading ? (
        <div className="container mx-auto p-20">
          <LoadingSpinner />
        </div>
      ) : (
        <CardSlider ppmkers={data.offeredServices} />
      )}
    </div>
  )
}
