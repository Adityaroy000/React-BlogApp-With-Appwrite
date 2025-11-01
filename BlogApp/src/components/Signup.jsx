import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useForm} from'react-hook-form'
import {Button,Input, Logo} from './index'
import { login } from "../store/authSlice"
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
function Signup() {
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit, formState: { errors }} = useForm()

    const create = async(data)=>{
        setError('')
        setSubmitting(true)
        try {
            const created = await authService.createAccount(data)
            if(created){
                const currentUser = await authService.getCurrentUser()
                if(currentUser){
                    dispatch(login(currentUser))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
        finally{
            setSubmitting(false)
        }
    }

  return (
    <div className="flex items-center justify-center">
        <div className={`mx-auto w-full max-w-lg bg-slate-800 rounded-xl p-10 border border-slate-700 text-slate-100`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-slate-50">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-slate-300">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-violet-300 transition-all duration-200 hover:text-violet-400 hover:underline"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className="text-rose-400 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(create)} className="mt-8">
                <div className="space-y-5">
                    <div>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            type="text"
                            {...register("name",{
                                required: "Name is required",
                                minLength: {value: 3, message: "Name should be at least 3 characters long"},
                            })}
                        />
                        {errors.name && <p className="text-rose-400 mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <Input 
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email",{
                                required: "Email is required",
                                pattern: {
                                    // simple, case-insensitive email check
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        {errors.email && <p className="text-rose-400 mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <Input
                            label="Password: "
                            placeholder="Enter your password"
                            type="password"
                            {...register("password",{
                                required: "Password is required",
                                minLength: {value: 8, message: "Password should be at least 8 characters long"},
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                                }
                            })}
                        />
                        {errors.password && <p className="text-rose-400 mt-1">{errors.password.message}</p>}
                    </div>

                    <div className='mt-10'>
                            <Button type="submit" className='w-full font-semibold' textColor="text-white" style={{ background: 'linear-gradient(160deg, #4C1D95 0%, #6D28D9 100%)' }} disabled={submitting}>
                                {submitting ? 'Creating account...' : 'Create Account'}
                            </Button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup