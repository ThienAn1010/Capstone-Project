import Link from "next/link"
import { getFacebookOAuthUrl } from "../../util/socialLogin"

const LoginFacebookButton = () => {
  return (
    <Link href={getFacebookOAuthUrl()}>
      <div className="border border-gray-300 rounded-md px-4 py-2">
        <div className="flex justify-center space-x-2 items-center">
          <svg
            fill="currentColor"
            className="h-7 w-7"
            stroke="unset"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              d="M44,38.44A5.56,5.56,0,0,1,38.44,44H9.56A5.56,5.56,0,0,1,4,38.44V9.56A5.56,5.56,0,0,1,9.56,4H38.44A5.56,5.56,0,0,1,44,9.56Z"
              fill="#3f51b5"
            ></path>
            <path
              d="M35.52,25.11H31.78V39.56H26.22V25.11H22.89V20.67h3.33V18c0-3.9,1.62-6.21,6.22-6.21h3.78v4.44H33.68c-1.79,0-1.91.67-1.91,1.91v2.53h4.44Z"
              fill="#fff"
            ></path>
          </svg>
          <span className="font-medium text-lg hover:cursor-pointer">
            Login with Facebook
          </span>
        </div>
      </div>
    </Link>
  )
}
export default LoginFacebookButton
