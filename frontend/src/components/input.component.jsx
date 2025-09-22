import { useState } from 'react';

export default function InputBox({ name, type, id, value, placeholder, icon }) {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <div className='mb-4 relative w-[100%]'>
            <input
                type={type === 'password' ? (passwordVisible ? 'text' : 'password') : type}
                id={id}
                name={name}
                defaultValue={value}
                placeholder={placeholder}
                className='input-box'
            />
            <i className={`fi ${icon} input-icon`} />
            {type === 'password' && (
                <i
                    className={`fi ${
                        passwordVisible ? 'fi-rr-eye' : 'fi-rr-eye-crossed'
                    } input-icon right-4 left-auto cursor-pointer`}
                    onClick={() => setPasswordVisible((prev) => !prev)}
                />
            )}
        </div>
    );
}
