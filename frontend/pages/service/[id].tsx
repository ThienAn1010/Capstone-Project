import type { NextPage } from "next"
import Feedback from "../../components/Feedback"

const Detail: NextPage = () => {
  return (
    <div className="container mx-auto px-14 py-12">
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 space-y-8">
          <h1 className="text-3xl font-bold  text-gray-900">
            Marriage Certificate - Nguyen Dang Lam Phuong
          </h1>
          <div className="flex space-x-8 px-4">
            <img
              className="h-48 w-48 rounded-full"
              alt="User Avatar"
              src="https://scontent.fsgn5-11.fna.fbcdn.net/v/t39.30808-1/274122720_3091224897757197_1462166273506091868_n.jpg?stp=dst-jpg_p200x200&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_ohc=LXf3YxPfE-IAX8kxuR7&_nc_ht=scontent.fsgn5-11.fna&oh=00_AT-DsK9KMOK-dhK7Y_ogNcTgLpdzrD8ApoE9Sm2UezKv0g&oe=62CB0321"
            />
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">
                Description
              </h2>
              <p className="text-justify">
                Hello! My name is Phuong. Lorem, ipsum dolor sit amet
                consectetur adipisicing elit. Fuga expedita omnis ullam dicta
                quaerat modi quisquam rem quos pariatur accusantium eligendi
                perspiciatis, laborum provident, fugit ab nihil quam cupiditate.
                Et.
              </p>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Service</h2>
          <h2 className="text-xl font-semibold text-gray-900">Statistics</h2>
          <Feedback />
        </div>
      </div>
    </div>
  )
}
export default Detail
