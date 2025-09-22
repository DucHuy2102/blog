import axios from 'axios';
import { useRef } from 'react';
import InputBox from './input.component';
import { toast, Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { useMemo } from 'react';

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

export default function AuthForm({ type }) {
    const setUser = useAuthStore((state) => state.setUser);
    const authFormRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const navigateRoute = useMemo(() => (type === 'sign-up' ? '/signin' : '/'), [type]);

    const fetchAuth = async (serverRoute, formData) => {
        try {
            setLoading(true);
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_API_URL}/api/auth/${serverRoute}`,
                formData
            );
            if (res.data?.success) {
                setUser(res.data.user);
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate(navigateRoute);
                }, 2500);
            }
        } catch (error) {
            console.log('Error in fetchAuth:', error);
            toast.error('Server error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(authFormRef.current);
        const data = Object.fromEntries(formData.entries());
        const { fullname, email, password } = data;

        if (type === 'sign-up' && !fullname) {
            return toast.error('Full Name is required.');
        }
        if (!email) {
            return toast.error('Email is required.');
        }
        if (!password) {
            return toast.error('Password is required.');
        }
        if (fullname?.length < 3) {
            return toast.error('Full Name must be at least 3 characters long.');
        }
        if (!emailRegex.test(email)) {
            return toast.error('Invalid email format.');
        }
        if (!passwordRegex.test(password)) {
            return toast.error(
                'Password must be 6-20 characters long, contain at least one numeric digit, one uppercase and one lowercase letter.'
            );
        }

        const serverRoute = type === 'sign-up' ? 'signup' : 'signin';
        fetchAuth(serverRoute, data);
    };

    return (
        <>
            <Toaster />
            <form ref={authFormRef} className='w-[80%] max-w-[400px]' onSubmit={handleSubmit}>
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
                <button type='submit' className='w-[40%] btn-dark center mt-14' disabled={loading}>
                    {loading ? 'Loading...' : type.replace('-', ' ')}
                </button>
            </form>
        </>
    );
}
