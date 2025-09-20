import { Link, Outlet } from 'react-router-dom';
import logo from '../imgs/logo.png';
import { useState } from 'react';

export default function Navbar() {
    const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);

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
                    <Link to='signin' className='py-2 btn-dark'>
                        Sign in
                    </Link>
                    <Link to='signup' className='hidden py-2 btn-light md:block'>
                        Sign up
                    </Link>
                </div>
            </nav>

            <Outlet />
        </>
    );
}
