import { Link, Outlet } from 'react-router-dom';
import logo from '../imgs/logo.png';
import { useEffect, useRef, useState } from 'react';
import useAuthStore from '../store/authStore';
import UserNavigation from './user-navigation.component';

export default function Navbar() {
    const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
    const { user } = useAuthStore((state) => state);
    const [openUserNav, setOpenUserNav] = useState(false);
    const userNavRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!userNavRef.current || userNavRef.current.contains(event.target)) {
                return;
            }
            setOpenUserNav(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [setOpenUserNav]);

    return (
        <>
            <nav className='navbar'>
                <Link to='/' className='flex-none w-10'>
                    <img src={logo} alt='Logo' className='w-full' />
                </Link>

                <div
                    className={`absolute left-0 bg-white border-b top-full border-grey md:show
                mt-0.5 py-4 px-[5vw] w-full md:border-none md:relative md:inset-0 md:block md:p-0 md:w-auto
                ${searchBoxVisibility ? 'show' : 'hide'}
                `}
                >
                    <input
                        type='text'
                        placeholder='Search'
                        className='w-full p-4 md:w-auto bg-grey pl-6 pr-[12%] md:pr-6 rounded-full 
                        placeholder:text-dark-grey outline-none md:pl-12 text-lg md:text-xl'
                    />
                    <i
                        className='absolute fi fi-rr-search right-[10%] md:pointer-events-none 
                    md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey'
                    />
                </div>

                <div className='flex items-center gap-3 ml-auto md:gap-6'>
                    <button
                        className='flex items-center justify-center w-12 h-12 rounded-full bg-grey md:hidden'
                        onClick={() => setSearchBoxVisibility((prev) => !prev)}
                    >
                        <i className='text-xl fi fi-rr-search' />
                    </button>
                    <Link to='/editor' className='hidden gap-2 rounded-lg md:flex link'>
                        <i className='fi fi-rr-file-edit' />
                        <span>Write</span>
                    </Link>
                    {user ? (
                        <>
                            <Link to='/dashboard/notification'>
                                <button className='relative w-12 h-12 rounded-full bg-grey hover:bg-black/10'>
                                    <i className='block mt-1 text-2xl fi fi-rr-bell' />
                                </button>
                            </Link>
                            <div
                                ref={userNavRef}
                                className='relative'
                                onClick={() => setOpenUserNav((prev) => !prev)}
                            >
                                <button className='w-12 h-12 mt-1'>
                                    <img
                                        src={user.personal_info.profile_img}
                                        alt='Avatar_User'
                                        className='object-cover w-full h-full rounded-full'
                                    />
                                </button>
                                {openUserNav && (
                                    <UserNavigation username={user.personal_info.username} />
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to='signin' className='py-2 btn-dark'>
                                Sign in
                            </Link>
                            <Link to='signup' className='hidden py-2 btn-light md:block'>
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            <Outlet />
        </>
    );
}
