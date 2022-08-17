import Link from "next/link"

const ThankYou = () => {
    return (
        <div className="flex items-center justify-center mt-10">
            <div className="p-1 rounded shadow-lg bg-gradient-to-r from-purple-500 via-green-500 to-blue-500">
                <div className="flex flex-col items-center p-4 space-y-2 bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Thank You!</h1>
                    <p>Thank you for your interest! We will notify when your booking is approved.</p>
                    <div
                    className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        <Link href="/" className="text-sm font-medium">
                            Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ThankYou