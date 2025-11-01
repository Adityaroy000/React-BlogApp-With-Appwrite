import React from 'react'

function Button({
    children,
    type = 'button',
  bgColor = 'bg-violet-400',
  textColor = 'text-slate-900',
    className = '',
    ...props
}) {
  return (
    <button className={`px-6 py-3 cursor-pointer rounded-full ${bgColor} ${textColor} shadow-md hover:shadow-lg transition-transform transform-gpu hover:-translate-y-0.5 ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button