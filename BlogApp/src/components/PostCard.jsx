import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from "react-router-dom"
function PostCard({$id, title, featuredImage}) {
  // featuredImage may be undefined/null. Build a safe preview URL or show placeholder.
  const imgSrc = featuredImage ? appwriteService.getFilePreview(featuredImage) : null;

  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-slate-900 rounded-xl p-4 text-slate-100 transition-shadow duration-200 hover:shadow-lg hover:shadow-violet-500/20'>
            <div className='w-full justify-center mb-4'>
                {imgSrc ? (
                    <img src={imgSrc} alt={title} className='rounded-xl' />
                ) : (
                    <div className='rounded-xl bg-slate-800 w-full h-40 flex items-center justify-center text-slate-400'>No Image</div>
                )}
            </div>
            <h2 className='text-xl font-bold text-slate-100'>{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard