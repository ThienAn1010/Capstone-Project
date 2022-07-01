import {  useState } from 'react'
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
    const [showForm, setShowForm] = useState(false);
    const [showemailForm, setShowemailForm] = useState(false);
    const [showphoneForm, setShowphoneForm] = useState(false);
    const [showaddressForm, setShowaddressForm] = useState(false);

    const nameform = () => {
        setShowForm(!showForm);
    }
    const phoneform = () => {
        setShowphoneForm(!showphoneForm);
    }
    const emailform = () => {
        setShowemailForm(!showemailForm);
    }
    const addressform = () => {
        setShowaddressForm(!showaddressForm);
    }

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
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium text-gray-500">Name</dt>
                                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span className="flex-grow">Nguyen Dang Lam Phuong</span>
                                    <span className="ml-4 flex-shrink-0">
                                        <button
                                            type="button"
                                            className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                            onClick={nameform}
                                        >
                                            Update
                                        </button>
                                    </span>
                                    {showForm && (
                                        <form>
                                            <input
                                                type='text'
                                                placeholder='Name'
                                                className='text-center ml-10'>
                                            </input>
                                        </form>
                                    )}
                                </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                                <dt className="text-sm font-medium text-gray-500">Photo</dt>
                                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span className="flex-grow">
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                    </span>
                                </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span className="flex-grow">s0000000@rmit.edu.vn  </span>
                                    <span className="ml-4 flex-shrink-0">
                                        <button
                                            type="button"
                                            className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                            onClick={emailform}
                                        >
                                            Update
                                        </button>
                                    </span>
                                    {showemailForm && (
                                        <form>
                                            <input
                                                type='email'
                                                placeholder='Email'
                                                className='text-center ml-10'>
                                            </input>
                                        </form>
                                    )}
                                </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                                <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span className="flex-grow">0123456789</span>
                                    <span className="ml-4 flex-shrink-0">
                                        <button
                                            type="button"
                                            className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                            onClick={phoneform}
                                        >
                                            Update
                                        </button>
                                    </span>
                                    {showphoneForm && (
                                        <form>
                                            <input
                                                type='text'
                                                placeholder='Phone number'
                                                className='text-center ml-10'>
                                            </input>
                                        </form>
                                    )}
                                </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                                <dt className="text-sm font-medium text-gray-500">Address</dt>
                                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span className="flex-grow">702 Nguyen Van Linh</span>
                                    <span className="ml-4 flex-shrink-0">
                                        <button
                                            type="button"
                                            className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                            onClick={addressform}
                                        >
                                            Update
                                        </button>
                                    </span>
                                    {showaddressForm && (
                                        <form>
                                            <input
                                                type='text'
                                                placeholder='Address'
                                                className='text-center ml-10'
                                            >
                                            </input>
                                        </form>
                                    )}
                                </dd>
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
