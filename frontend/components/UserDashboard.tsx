import react, {useState} from 'react'
import {
  BellIcon,
  UserCircleIcon,
  ShoppingCartIcon
} from '@heroicons/react/outline'

const subNavigation = [
  { name: 'Profile', href: '#', icon: UserCircleIcon, current: true },
  { name: 'My Order', href: '#', icon: ShoppingCartIcon, current: false },
  { name: 'Notifications', href: '#', icon: BellIcon, current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function UserDashboard() {
    const [firstName, setFirstName] = useState("Nguyen");
    const [phoneNumber, setPhoneNumber] = react.useState("0123456789");
    const [address, setAddress] = react.useState("702 Nguyen Van Linh");
    const [image] = react.useState(null)
    const isInvalidName =
        !firstName.match(/[a-zA-Z]/)
    const isInvalidPhone =
        !phoneNumber.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
    const isInvalidAddress =
        address === "";
    // const ref = react.useRef();
    // // const clear = () => {
    // //     ref.current.value = "";
    // // };
    // const handleImageOnChange = (e) => {
    //     e.preventDefault();
    //     const file = e.target.files[0];
    //     if (!file) return setImage(null);
    //     console.log(file.size);
    //     if (file.size > 2097152) {
    //         alert("File is too big!");
    //         clear();
    //     } else {
    //         setImage(e.target.files[0]);
    //     }
    // };
    return (
    <div>
        <div className="h-full">
            <main className="max-w-7xl mx-auto pb-10 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                    <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
                        <nav className="space-y-1">
                            {subNavigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        item.current
                                        ? 'bg-gray-50 text-orange-600 hover:bg-white'
                                        : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50',
                                        'group rounded-md px-3 py-2 flex items-center text-sm font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    <item.icon
                                        className={classNames(
                                        item.current ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-500',
                                        'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                                        )}
                                        aria-hidden="true"
                                    />
                                    <span className="truncate">{item.name}</span>
                                </a>
                            ))}
                        </nav>
                    </aside>
                    <div className="divide-y divide-gray-200 lg:col-span-9 mx-5">
                    <div className="space-y-1">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
                        <p className="max-w-2xl text-sm text-gray-500">
                        This information will be displayed publicly so be careful what you share.
                        </p>
                    </div>
                    <div className="mt-6">
                        <dl className="divide-y divide-gray-200">
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-3">
                                <label htmlFor='nameInput' className="text-sm font-medium text-gray-500">Name</label>
                                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <input className='flex-grow h-8 pt-1 pl-1 border-2 border-gray-300 hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg'
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    />
                                </dd>
                                <div></div>
                                {isInvalidName && (
                                    <div>
                                        <h3 className="font-bold text-red-500">
                                            Invalid name!
                                        </h3>
                                    </div>
                                )}
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                                <dt className="text-sm font-medium text-gray-500">Photo</dt>
                                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span className="">
                                        <img
                                        className="h-10 w-10 rounded-full"
                                        src={image
                                            ? image
                                            : "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                                        alt=""
                                        />
                                    </span>
                                    <input
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    accept=".jpg,.png,.jpeg"
                                    // onChange={handleImageOnChange}
                                    // ref={ref}
                                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm
                                    leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    />
                                </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                                <label htmlFor='nameInput' className="text-sm font-medium text-gray-500">Email</label>
                                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <input className='flex-grow h-8 pt-1 pl-1 border-2 border-gray-300 hover:border-blue-400 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg disabled'
                                    value="s0000000@rmit.edu.vn"
                                    />
                                </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                                <label htmlFor='nameInput' className="text-sm font-medium text-gray-500">Phone Number</label>
                                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <input className='flex-grow h-8 pt-1 pl-1 border-2 border-gray-300 hover:border-blue-400 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg'
                                    value={phoneNumber}
                                    onChange={e => setPhoneNumber(e.target.value)}
                                    />
                                </dd>
                                <div></div>
                                {isInvalidPhone && (
                                    <div className="flex sm:mt-0 sm:col-span-2">
                                        <h3 className="flex-grow font-bold text-red-500 ">
                                            Invalid phone number!
                                        </h3>
                                    </div>
                                )}
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                                <label htmlFor='nameInput' className="text-sm font-medium text-gray-500">Address</label>
                                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <input className='flex-grow h-8 pt-1 pl-1 border-2 border-gray-300 hover:border-blue-400 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500  rounded-lg'
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                    />
                                </dd>
                                {isInvalidAddress && (
                                <span>
                                    <h3 className="font-bold text-red-500 ">
                                        All fields must not be empty!
                                    </h3>
                                </span>
                            )}
                            </div>
                            <div className="text-right flex-shrink-0">
                                <button
                                type="submit"
                                className="inline-flex mt-5 w-28 justify-center py-2 px-4 border border-transparent shadow-sm
                                text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                                disabled>
                                Update
                                </button>
                            </div>
                        </dl>
                    </div>
                </div>
                </div>
            </main>
        </div>
    </div>
  )
}
