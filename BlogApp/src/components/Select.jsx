import React,{useId} from 'react'

function Select({
    options = [],
    label,
    className="",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label htmlFor={id}></label>}
            <select className = {`px-3 py-2 rounded-lg bg-slate-700 text-slate-100 outline-none focus:bg-slate-600 duration-200 border border-slate-600 w-full ${className}`}  
            id={id} 
            ref={ref}
            >
                {options?.map((option)=>(
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)