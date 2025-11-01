import React, {useId, useState} from 'react'

const Input = React.forwardRef(function Input ({
    label,
    labelClassName = '',
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId();
    const [show,setShow] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (show ? "text" : "password") : type;
    return (
        <div className='w-full'>
            <div className='w-full relative'>
                {label && <label className={`inline-block mb-1 pl-1 ${labelClassName}`}
                    htmlFor = {id}>
                        {label}
                    </label>
                }
                <input type={inputType}
                    className={`px-3 py-2 rounded-lg bg-slate-700 text-slate-100 outline-none focus:bg-slate-600 duration-200 border border-slate-600 w-full ${isPassword ? 'pr-10' : ''} ${className}`}
                    ref={ref}
                    {...props}
                    id={id}
                />
                {isPassword && (
                    <button
                        type='button'
                        onClick={()=>setShow(s => !s)}
                        aria-label={show ? "Hide password" : "Show password"}
                        className="absolute -right-0.5 top-3/4 -translate-x-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-100 transition-colors"
                    >
                        {show ? (
                            // eye-off icon
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.966 9.966 0 012.05-5.875M6.1 6.1A9.955 9.955 0 0112 5c5.523 0 10 4.477 10 10 0 1.01-.164 1.985-.475 2.897M3 3l18 18" />
                            </svg>
                        ) : (
                            // eye icon
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                )}
            </div>
        </div>
    )
})

export default Input