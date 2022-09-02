import Link from "next/link"

export default function MainCarousel() {
  return (
    <div className="relative">
      <div className="absolute text-white z-[2] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] justify-center items-center text-3xl text-center max-w-[960px]">
        <p className="font-['Playfair_Display'] font-black text-[42px] w-[760px] tracking-wide leading-tight text-center mx-auto">
          We Ensure the best Paperwork Service for you
        </p>
        <p className="font-['Roboto'] text-sm mt-[20px]">
          We know how difficulty it is to find the right person for your paper
          work. With Paperwork, every paper maker is transperant with duration,
          price, certificate so you can safely choose one that match your case
          with ease
        </p>
        <Link href="/service">
          <a className="mt-[40px] text-[15px] bg-blue-600 px-2 rounded-sm inline-block hover:bg-blue-700">
            Explore Now
          </a>
        </Link>
      </div>
      <img
        src="https://source.unsplash.com/OQMZwNd3ThU/2400x1601"
        alt="carousel image"
        className="object-cover object-top w-full md:object-center sm:h-80 md:h-96 lg:h-[32rem] xl:h-[38rem]"
      />
      <div className="absolute top-0 left-0 w-full sm:h-80 md:h-96 lg:h-[32rem] xl:h-[38rem] bg-slate-700 opacity-40"></div>
    </div>
  )
}
