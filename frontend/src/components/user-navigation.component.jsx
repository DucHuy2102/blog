import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimationWrapper from '../common/page-animation';
import useAuthStore from '../store/authStore';
import axios from 'axios';

export default function UserNavigation({ username }) {
    const clearUser = useAuthStore((state) => state.clearUser);

    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_API_URL}/api/auth/signout`,
                {},
                {
                    withCredentials: true,
                }
            );
            console.log(res);
            if (res.data.success) {
                clearUser();
            }
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    return (
        <AnimationWrapper transition={{ duration: 0.2 }} className='absolute right-0 z-50 mt-4 '>
            <div className='absolute right-0 transition-transform duration-200 bg-white border rounded-b-xl border-grey w-60'>
                <Link to='/editor' className='flex gap-2 py-4 pl-8 link md:hidden'>
                    <i className='fi fi-rr-file-edit' />
                    <span>Write</span>
                </Link>
                <Link
                    to={`/user/${username}`}
                    className='py-4 pl-8 link hover:opacity-100 hover:font-medium'
                >
                    <i className='fi fi-sr-user' />
                    <span className='pl-2'>Profile</span>
                </Link>
                <Link
                    to='/dashboard/blogs'
                    className='py-4 pl-8 link hover:opacity-100 hover:font-medium'
                >
                    <i className='fi fi-rr-chart-line-up' />
                    <span className='pl-2'>Dashboard</span>
                </Link>
                <Link
                    to='/setting/edit-profile'
                    className='py-4 pl-8 link hover:opacity-100 hover:font-medium'
                >
                    <i className='fi fi-sr-settings-sliders' />
                    <span className='pl-2'>Setting</span>
                </Link>
                <span className='absolute border-t border-grey w-[100%]' />
                <motion.button
                    className='relative flex items-center justify-between w-full p-4 pl-8 rounded-b-xl group hover:bg-red'
                    onClick={handleSignOut}
                    whileHover='visible'
                    initial='hidden'
                >
                    <div className='flex flex-col items-start gap-1'>
                        <span className='text-xl font-bold group-hover:text-white'>Sign Out</span>
                        <span className='text-sm text-dark-grey group-hover:text-white'>
                            @{username}
                        </span>
                    </div>

                    <motion.span
                        variants={{
                            hidden: { opacity: 0, x: -10 },
                            visible: { opacity: 1, x: 0 },
                        }}
                    >
                        <i className='text-2xl fi fi-rr-sign-out-alt group-hover:text-white' />
                    </motion.span>
                </motion.button>
            </div>
        </AnimationWrapper>
    );
}
