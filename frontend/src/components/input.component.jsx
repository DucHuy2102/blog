export default function InputBox({ name, type, id, value, placeholder, icon }) {
    return (
        <div className='mb-4 relative w-[100%]'>
            <input
                type={type}
                id={id}
                name={name}
                defaultValue={value}
                placeholder={placeholder}
                className='input-box'
            />
            <i className={`fi ${icon} input-icon`} />
        </div>
    );
}
