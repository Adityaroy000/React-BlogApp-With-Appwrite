import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = ()=>{
        authService.logout().then(()=>{
            dispatch(logout());
        })
    }
  return (
    <button className='inline-block px-4 py-2 duration-200 hover:bg-red-800 hover:text-white rounded-full bg-purple-300 hover:cursor-pointer text-black font-bold' onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn