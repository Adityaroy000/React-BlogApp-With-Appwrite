import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'
function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async ()=>{
      try {
        await authService.logout();
        dispatch(logout());
        navigate('/');
      } catch (error) {
        console.error('Logout error', error);
      }
    }
  return (
    <button className='inline-block px-4 py-2 duration-200 rounded-full bg-violet-400 text-slate-900 hover:shadow-lg hover:shadow-violet-500/30 hover:cursor-pointer font-bold' onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn