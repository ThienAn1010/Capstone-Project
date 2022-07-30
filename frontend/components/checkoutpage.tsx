/* eslint-disable @next/next/no-img-element */
import react, {useState} from "react";
const products = [
    {
        id: 1,
        name: 'Marriage Certificate',
        href: '#',
        paperMaker: "Nguyen Dang Lam Phuong",
        paperRequester: "Dang Vu Thang",
        EstimatedDay: "5 to 7 days",
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-page-07-product-01.jpg',
        imageAlt: 'Front of zip tote bag with white canvas, white handles, and black drawstring top.',
    },
    ]
const Checkout = () => {
    const [firstName, setFirstName] = useState("Nguyen");
    const [phoneNumber, setPhoneNumber] = react.useState("0123456789");
    const [address, setAddress] = react.useState("702 Nguyen Van Linh");
    const isInvalidName =
        firstName.match(/[^a-zA-Z]/)
    const isInvalidPhone =
        !phoneNumber.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
    const isInvalidAddress =
        address === "";
return (
    <div>
    {/* Background color split screen for large screens */}
    {/* <div className="hidden lg:block fixed top-0 left-0 w-1/2 h-full bg-white" aria-hidden="true" />
    <div className="hidden lg:block fixed top-0 right-0 w-1/2 h-full bg-indigo-900" aria-hidden="true" /> */}
    <div className="hidden lg:min-w-1 md:min-w-full fixed"></div>
    <main className="relative mx-auto lg:px-8">
        <h1 className="sr-only">Checkout</h1>

        <section
        aria-labelledby="summary-heading"
        className="bg-blue-300 text-black md:py-0 md:px-10
        lg:mx-auto lg:px-10 lg:py-0 rounded-3xl mb-6"
        >
        <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
            <dl>
            <dt className="text-2xl pt-3 font-bold">Service Ordered</dt>
            </dl>

            <ul role="list" className="text-sm font-medium divide-y mt-3 divide-white divide-opacity-10">
            {products.map((product) => (
                <li key={product.id} className="flex items-start py-2 space-x-4">
                    <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="flex-none w-20 h-20 rounded-md object-center object-cover"
                    />
                    <div className="flex-auto space-y-1 text-gray-700">
                        <h3 className="text-2xl text-gray-900">{product.name}</h3>
                        <span>
                            Paper Maker: &nbsp;
                        </span>
                        <span className="font-bold">
                            {product.paperMaker}
                        </span> <br/>
                        <span>
                            Estimated Duration: &nbsp;
                        </span>
                        <span className="font-bold">
                            {product.EstimatedDay}
                        </span>
                    </div>
                </li>
            ))}
            </ul>

            <dl className="text-sm font-medium space-y-1 border-t border-white border-opacity-10 pt-6">
                <div className="flex items-center justify-between text-gray-700">
                    <dt>Subtotal</dt>
                    <dd>$570.00</dd>
                </div>

                <div className="flex items-center justify-between text-gray-700">
                    <dt>Taxes</dt>
                    <dd>$47.60</dd>
                </div>

                <div className="flex pb-3 items-center justify-between border-t border-black
                border-opacity-10 pt-2 font-bold">
                    <dt className="text-base">Total</dt>
                    <dd className="text-base">$642.60</dd>
                </div>
            </dl>
        </div>
        </section>

        <section
        aria-labelledby="payment-and-shipping-heading"
        className="bg-blue-300 text-black md:py-0 md:px-10
        lg:mx-auto lg:px-10 lg:py-0 rounded-3xl mb-6"
        >
        <h2 id="payment-and-shipping-heading" className="sr-only">
            Payment and shipping details
        </h2>

        <form>
            <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                <div>
                    <h3 id="contact-info-heading" className="text-2xl pt-3 font-bold text-gray-900">
                    Contact information
                    </h3>
                    <div className="mt-4">
                    <label htmlFor="fullname" className="block text-lg font-medium my-3 text-gray-700">
                        Full name
                    </label>
                    <input className="mt-1 pl-3 h-10 block w-full shadow-sm sm:text-sm
                    border-2 border-gray-300 hover:border-blue-400 focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    />
                    {isInvalidName && (
                        <div className="mt-2">
                            <h3 className="font-bold text-red-500">
                                Invalid name!
                            </h3>
                        </div>
                    )}
                    <label htmlFor="email-address" className="block text-lg font-medium my-3 text-gray-700">
                        Email address
                    </label>
                    <input className="mt-1 pl-3 h-10 block w-full shadow-sm sm:text-sm
                     border-2 border-gray-300 hover:border-blue-400 focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
                    value="s0000000@rmit.edu.vn"
                    />
                    <dd>
                        <label htmlFor="fullname" className="block text-lg font-medium my-3 text-gray-700">
                        Phone number
                        </label>
                        <input className="mt-1 pl-3 h-10 block w-full shadow-sm sm:text-sm
                        border-2 border-gray-300 hover:border-blue-400 focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                        />
                    </dd>
                    {isInvalidPhone && (
                        <div className="flex sm:mt-2 sm:col-span-2">
                            <h3 className="flex-grow font-bold text-red-500 ">
                                Invalid phone number!
                            </h3>
                        </div>
                    )}
                    <label htmlFor="address" className="block text-lg font-medium my-3 text-gray-700">
                        Address
                    </label>
                    <input className="mt-1 pl-3 h-10 block w-full shadow-sm sm:text-sm
                    border-2 border-gray-300 hover:border-blue-400 focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    />
                    {isInvalidAddress && (
                        <div className="mt-2">
                            <h3 className="font-bold text-red-500 ">
                                All fields must not be empty!
                            </h3>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-5 flex justify-end pb-5">
                <button
                type="submit"
                className="bg-blue-600 rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                Pay now
                </button>
            </div>
            </div>
        </form>
        </section>
    </main>
    </div>
)
}
export default Checkout