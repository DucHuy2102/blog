import googleIcon from '../imgs/google.png';
import { Link } from 'react-router-dom';
import AnimationWrapper from '../common/page-animation';
import AuthForm from '../components/auth-form.component';

export default function UserAuthForm({ type }) {
    const subText =
        type === 'sign-in'
            ? 'Sign in to access your personalized dashboard, connect with the community, and continue your blogging journey.'
            : 'Create your free account to share your stories, connect with readers, and become part of our vibrant blogging community.';

    return (
        <AnimationWrapper keyValue={type}>
            <section className='flex flex-col items-center justify-center h-cover'>
                <h1 className='mb-1 text-4xl text-center capitalize font-gelasio'>
                    {type === 'sign-in' ? 'Welcome Back' : 'Join Us Today'}
                </h1>
                <h1 className='mb-16 text-xl text-center font-gelasio w-[50%]'>{subText}</h1>

                <AuthForm type={type} />

                <div className='w-[80%] max-w-[400px]'>
                    <div className='relative flex items-center w-full gap-2 my-10 font-bold text-black uppercase opacity-30'>
                        <hr className='w-1/2 border-black' />
                        OR
                        <hr className='w-1/2 border-black' />
                    </div>
                    <button className='flex items-center justify-center btn-dark gap-4 w-[90%] center'>
                        <img src={googleIcon} alt='logo-google' className='w-5' />
                        continue with Google
                    </button>
                    {type === 'sign-in' ? (
                        <p className='mt-6 text-xl text-center text-dark-grey'>
                            Don't have an account?{' '}
                            <Link to='/signup' className='ml-1 text-xl text-black underline'>
                                Sign Up
                            </Link>
                        </p>
                    ) : (
                        <p className='mt-6 text-xl text-center text-dark-grey'>
                            Already a member?{' '}
                            <Link to='/signin' className='ml-1 text-xl text-black underline'>
                                Sign In Here
                            </Link>
                        </p>
                    )}
                </div>
            </section>
        </AnimationWrapper>
    );
}
