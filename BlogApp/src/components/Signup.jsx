import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useForm} from'react-hook-form'
import {Button,Input, Logo} from './index'
import { Login } from "../store/authSlice"
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
function Signup() {
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()

    const create = async(data)=>{
        setError('')
        try {
            const userData = await authService.createAccount(data)
            if(userData){
                const userData = await authService.getCurrentUser()
                if(userData){
                    dispatch(Login(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(create)} className="mt-8">
                <Input
                    label="Full Name: "
                    placeholder="Enter your full name"
                    type="text"
                    {...register("name",{
                        required: true,
                        minLength: {value: 3, message: "Name should be at least 3 characters long"},
                    })}
                />
                <Input 
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email",{
                        required: true,
                        validate: {
                            matchPattern: (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/.test(value) || "Invalid email address"
                        }
                    })}
                />
                <Input
                label="Password: "
                placeholder="Enter your password"
                type="password"
                {...register("password",{
                    required: true,
                    minLength: {value: 8, message: "Password should be at least 8 characters long"},
                    matchPattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                    }
                })}
                />
                <Button type="submit" className='w-full'>Create Account</Button>
            </form>
        </div>
    </div>
  )
}

export default Signup