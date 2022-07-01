import React from 'react'
import Image from 'next/image';
import {
    BellIcon,
    ChatIcon,
    GlobeIcon,
    PlusIcon,
    SparklesIcon,
    SpeakerphoneIcon,
    VideoCameraIcon,
} from '@heroicons/react/outline';
import {
    HomeIcon,
    ChevronDownIcon,
    SearchIcon,
    MenuIcon
} from '@heroicons/react/solid';
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';

const Header = () => {
    const { data: session } = useSession();
    return (
        <div className="flex sticky top-0 z-50 bg-white px-4 py-2 shadow-sm items-center">
            <div className="relative h-10 w-28 flex-shrink-0 cursor-pointer">
                <Link href={'/'}>
                    <Image
                        alt="logo"
                        layout="fill"
                        className="contain"
                        src="https://links.papareact.com/fqy"
                    />
                </Link>
            </div>

            <div className="mx-7 flex items-center xl:min-w-[300px]">
                <HomeIcon className="h-5 w-5" />
                <p className="ml-2 hidden flex-1 lg:inline">Home</p>
                <ChevronDownIcon className="h-5 w-5" />
            </div>

            {/* Search box */}
            <form className="flex flex-1 items-center space-x-2 rounded-sm
                border border-gray-200 bg-gray-100 px-3 py-1">
                <SearchIcon className="h-6 w-6 text-gray-400" />
                <input
                    className="flex-1 bg-transparent outline-none"
                    type="text"
                    placeholder="Search Reddit" />
                <button type="submit" hidden />
            </form>

            {/* List icon or Menu icon */}
            <div className="mx-5 hidden items-center space-x-2 text-gray-500
                lg:inline-flex">
                <SparklesIcon className="icon" />
                <GlobeIcon className="icon" />
                <VideoCameraIcon className="icon" />
                <hr className="h-10 border border-gray-100" />
                <ChatIcon className="icon" />
                <BellIcon className="icon" />
                <PlusIcon className="icon" />
                <SpeakerphoneIcon className="icon" />
            </div>
            <div className="ml-3 flex items-center lg:hidden">
                <MenuIcon className="icon" />
            </div>

            {/* Sign in/ Sign out button */}
            <div
                onClick={() => session ? signOut() : signIn()}
                className="hidden cursor-pointer items-center space-x-2
                    border border-gray-200 p-2 lg:flex">
                <div className="relative h-5 w-5 flex-shrink-0 cursor-pointer">
                    <Image
                        src="https://links.papareact.com/23l"
                        className="contain"
                        layout="fill"
                        alt="logo-sign-in-sign-out"
                    />
                </div>
                {session ? (
                    <>
                        <div className="flex-1 text-xs">
                            <p className="truncate">{session?.user?.name}</p>
                            <p className="text-gray-400">1 Karma</p>
                        </div>
                        <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
                    </>
                ) : (
                    <p className="text-gray-400">Sign In</p>
                )}
            </div>

        </div >
    )
}

export default Header