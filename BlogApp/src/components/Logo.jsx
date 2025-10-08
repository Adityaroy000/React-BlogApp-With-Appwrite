import React from 'react'
import blogLogo from '../assets/BlogLogo.png'

function Logo({ width = '56px'}) {
  // container uses the provided `width` as both width and height to form a circle
  const containerStyle = { width, height: width, borderRadius: '50%' }
  // make the image fill the circle and be clipped (cropped) to the circular shape
  const imgStyle = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' }

  return (
    <div className='flex items-center'>
      <div className='flex items-center justify-center bg-gray-100 overflow-hidden' style={containerStyle}>
        <img src={blogLogo} alt="BlogApp logo" style={imgStyle} />
      </div>
      <span className='text-2xl font-bold text-gray-700 ml-2'></span>
      {/* <h1 className="text-5xl font-bold bg-gradient-to-t  from-black to-brand-purple bg-clip-text text-transparent">
        BLOG
      </h1> */}
    </div>
  )
}

export default Logo