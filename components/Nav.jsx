"use client";
import Image from 'next/image';

import Link from 'next/link';
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
    const {data: session} = useSession();
    const [providers, setproviders] = useState(null);
    const [ToogleDropdown, setToogleDropdown] = useState(false);

    useEffect(() => {

        const setUpProviders = async () => {
            const response = await getProviders();
            setproviders(response);
        }
        setUpProviders();

    }, [])

    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href="/" className='flex gap-2 flex-center'>
                <Image src="/assets/images/logo.svg" alt='devdart' width={30} height={30} className='object-contain' />
                <p className='logo_text'>DevDart</p>
            </Link>

            {/* Desktop View */}
            <div className='sm:flex hidden'>
                {
                    session?.user ? (
                        <div className='flex gap-3 md:gap-5'>
                            <Link href="/create-post" className='black_btn'>
                                Create Post
                            </Link>
                            <button type='button' onClick={signOut} className='outline-btn'>Sign Out</button>
                            <Link href="/profile">
                                <Image
                                    src={session?.user.image}
                                    width={37}
                                    height={37}
                                    alt='profile'
                                    className='rounded-full'
                                />
                            </Link>
                        </div>
                    ) : (
                        <div>
                            {providers && Object.values(providers).map((provider) => (
                                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'> Sign In</button>
                            ))}
                        </div>
                    )
                }
            </div>

            {/* Mobile View */}
            <div className='sm:hidden flex relative'>
                {session?.user ? (
                    <div className='flex'>
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            alt='profile'
                            className='rounded-full'
                            onClick={() => { setToogleDropdown((prev) => !prev) }}
                        />
                        {ToogleDropdown && (
                            <div className='dropdown'>
                                <Link href="/profile" className='dropdown_link'
                                    onClick={() => setToogleDropdown(false)}>My Profile</Link>
                                <Link href="/create-post" className='dropdown_link'
                                    onClick={() => setToogleDropdown(false)}>Create Prompt</Link>
                                <button type="button"
                                onClick={()=>{
                                    setToogleDropdown(false);
                                    signOut();
                                }}
                                className='mt-5 w-full black_btn'>Sign out</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        {providers && Object.values(providers).map((provider) => (
                            <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className='black-btn'> Sign In</button>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Nav