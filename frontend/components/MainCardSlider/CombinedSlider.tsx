import CardSlider from "./CardSlider"
import useGetAllPaperMakers from "../../hooks/useGetAllPapermakers"
import LoadingSpinner from "../LoadingSkeleton/LoadingSpinner"

export default function CombinedSlider() {
  const { data, isLoading } = useGetAllPaperMakers()

  const ppmaker_work_permit:any = []
  const ppmaker_marriage:any = []
  const ppmaker_id_card:any = []
  const ppmaker_land_use:any = []
  data?.offeredServices.map((item: any) => {
    if (item.service.id == "1") {
      ppmaker_marriage.push(item)
    }
    if (item.service.id == "2") {
      ppmaker_work_permit.push(item)
    }
    if (item.service.id == "3") {
      ppmaker_id_card.push(item)
    }
    if (item.service.id == "4") {
      ppmaker_land_use.push(item)
    }
  })
  return (
    <div>
       {isLoading ? (
        <div className="container mx-auto p-20">
          <LoadingSpinner />
        </div>
      ) : (<CardSlider ppmkers={data.offeredServices} />)}
    </div>
  )
}
