import type { NextPage } from "next"
import Feedback from "../components/Feedback"

const PaperMaker: NextPage = () => {
  return (
    <>
      <main className=" mx-auto">
        <div className="mt-5">
          <div className="mt-5 flex flex-col gap-y-2">
            <Feedback />
          </div>
        </div>
      </main>
    </>
  )
}

export default PaperMaker
