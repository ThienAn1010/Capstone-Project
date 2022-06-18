const products = [
{
    id: 1,
    name: 'Marriage Certificate',
    href: '#',
    price: '$210.00',
    paperMaker: "Nguyen Dang Lam Phuong",
    paperRequester: "Dang Vu Thang",
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-page-07-product-01.jpg',
    imageAlt: 'Front of zip tote bag with white canvas, white handles, and black drawstring top.',
},
]
const Checkout = () => {
return (
    <div className="bg-white">
    {/* Background color split screen for large screens */}
    <div className="hidden lg:block fixed top-0 left-0 w-1/2 h-full bg-white" aria-hidden="true" />
    <div className="hidden lg:block fixed top-0 right-0 w-1/2 h-full bg-indigo-900" aria-hidden="true" />

    <main className="relative grid grid-cols-1 gap-x-16 max-w-7xl mx-auto lg:px-8 lg:grid-cols-2 mt-10">
        <h1 className="sr-only">Checkout</h1>

        <section
        aria-labelledby="summary-heading"
        className="bg-indigo-900 text-indigo-300 pt-6 pb-12 md:px-10 lg:max-w-lg lg:w-full lg:mx-auto lg:px-0 lg:pt-0 lg:pb-24 lg:bg-transparent lg:row-start-1 lg:col-start-2"
        >
        <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
            <h2 id="summary-heading" className="sr-only">
            Order summary
            </h2>

            <dl>
            <dt className="text-sm font-medium">Amount due</dt>
            <dd className="mt-1 text-3xl font-extrabold text-white">$232.00</dd>
            </dl>

            <ul role="list" className="text-sm font-medium divide-y divide-white divide-opacity-10">
            {products.map((product) => (
                <li key={product.id} className="flex items-start py-6 space-x-4">
                <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="flex-none w-20 h-20 rounded-md object-center object-cover"
                />
                <div className="flex-auto space-y-1">
                    <h3 className="text-white text-3xl">{product.name}</h3>
                    <p className="text-lime-400">Paper Maker: {product.paperMaker}</p>
                    <p>Paper Requester: {product.paperRequester}</p>
                </div>
                <p className="flex-none text-base font-medium text-white">{product.price}</p>
                </li>
            ))}
            </ul>

            <dl className="text-sm font-medium space-y-6 border-t border-white border-opacity-10 pt-6">
            <div className="flex items-center justify-between">
                <dt>Subtotal</dt>
                <dd>$570.00</dd>
            </div>

            <div className="flex items-center justify-between">
                <dt>Shipping</dt>
                <dd>$25.00</dd>
            </div>

            <div className="flex items-center justify-between">
                <dt>Taxes</dt>
                <dd>$47.60</dd>
            </div>

            <div className="flex items-center justify-between border-t border-white border-opacity-10 text-white pt-6">
                <dt className="text-base">Total</dt>
                <dd className="text-base">$642.60</dd>
            </div>
            </dl>
        </div>
        </section>

        <section
        aria-labelledby="payment-and-shipping-heading"
        className="py-16 lg:max-w-lg lg:w-full lg:mx-auto lg:pt-0 lg:pb-24 lg:row-start-1 lg:col-start-1"
        >
        <h2 id="payment-and-shipping-heading" className="sr-only">
            Payment and shipping details
        </h2>

        <form>
            <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                <div>
                    <h3 id="contact-info-heading" className="text-lg font-medium text-gray-900">
                    Contact information
                    </h3>

                    <div className="mt-6">
                    <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                        Full name
                    </label>
                    <div className="mt-1">
                        <input
                        type="text"
                        id="name"
                        name="name"
                        autoComplete="text"
                        className="block w-full border-gray-300 rounded-md shadow-sm mb-4
                        focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <div className="mt-1">
                        <input
                        type="email"
                        id="email-address"
                        name="email-address"
                        autoComplete="email"
                        className="block w-full border-gray-300 rounded-md shadow-sm mb-4
                        focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                    </label>
                    <div className="mt-1">
                        <input
                        type="text"
                        id="address"
                        name="address"
                        autoComplete="text"
                        className="block w-full border-gray-300 rounded-md shadow-sm mb-4
                        focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                        Phone number
                    </label>
                    <div className="mt-1">
                        <input
                        type="number"
                        id="phone-number"
                        name="phone-number"
                        autoComplete="number"
                        className="block w-full border-gray-300 rounded-md shadow-sm mb-4
                        focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-10 flex justify-end pt-6 border-t border-gray-200">
                <button
                type="submit"
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
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