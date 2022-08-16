import { FC } from "react"

const LoadingSpinner: FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="loader">
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
      </div>
    </div>
  )
}
export default LoadingSpinner
