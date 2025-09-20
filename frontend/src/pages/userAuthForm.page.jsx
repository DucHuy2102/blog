import googleIcon from '../imgs/google.png';
import InputBox from '../components/input.component';
import { Link } from 'react-router-dom';
import AnimationWrapper from '../common/page-animation';

export default function UserAuthForm({ type }) {
    return (
        <AnimationWrapper keyValue={type}>
            <section className='flex items-center justify-center h-cover'>
                <form className='w-[80%] max-w-[400px]'>
                    <h1 className='mb-24 text-4xl text-center capitalize font-gelasio'>
                        {type === 'sign-in' ? 'Welcome Back' : 'Join Us Today'}
                    </h1>
                    {type === 'sign-up' && (
                        <InputBox
                            name='fullname'
                            type='text'
                            id='fullname'
                            placeholder='Full Name'
                            icon='fi-rr-user'
                        />
                    )}
                    <InputBox
                        name='email'
                        type='email'
                        id='email'
                        placeholder='Email'
                        icon='fi-rr-envelope'
                    />
                    <InputBox
                        name='password'
                        type='password'
                        id='password'
                        placeholder='Password'
                        icon='fi-rr-key'
                    />
                    <button type='submit' className='btn-dark center mt-14'>
                        {type.replace('-', ' ')}
                    </button>
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
                </form>
            </section>
        </AnimationWrapper>
    );
}
