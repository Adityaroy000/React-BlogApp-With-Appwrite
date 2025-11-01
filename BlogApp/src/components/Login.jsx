import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from "../store/authSlice"
import { useDispatch } from 'react-redux'
import {Button,Input, Logo} from './index'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [errors, setErrors] = useState("");
    const [submitting, setSubmitting] = useState(false);

    
    const login = async(data)=>{
        setErrors("");
        setSubmitting(true);
        try {
            const session = await authService.login(data)
            console.log('Login: session', session)
            if(session){
                const userData = await authService.getCurrentUser()
                console.log('Login: userData', userData)
                if(userData){
                    dispatch(authLogin(userData));
                    navigate("/");
                }
            }
        } catch (error) {
            console.error('Login error:', error)
            setErrors(error.message);
        } finally {
            setSubmitting(false);
        }
    }
  return (
    <div className='flex items-center justify-center w-full mt-8 mb-8'>
        <div className={`mx-auto w-full max-w-lg bg-slate-800 rounded-xl p-10 border border-slate-700 text-slate-100`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-slate-50">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-slate-300">
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className="font-medium text-violet-300 transition-all duration-200 hover:text-violet-400 hover:underline"
                >
                    Sign Up
                </Link>
            </p>
            {errors && <p className="text-rose-400 mt-8 text-center">{errors}</p>}

            <form onSubmit={handleSubmit(login)} className="mt-8">
                <div className="space-y-5">
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
                    <Input
                        label="Password: "
                        placeholder="Enter your password"
                        type="password"
                        {...register("password",{
                            required: true,
                            minLength: {value: 8, message: "Password must be at least 8 characters long" },
                            validate: {
                                matchPattern: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) || "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                            }
                        })}
                    />
                    <Button
                        type="submit"
                        textColor="text-white"
                        style={{ background: 'linear-gradient(160deg, #4C1D95 0%, #6D28D9 100%)' }}
                        className={`w-full ${submitting? "opacity-80 cursor-not-allowed":""}`}
                        disabled={submitting}
                    >{submitting ? "Signing in...":"Sign in"}</Button>
                </div>
            </form>
        </div>    
    </div>
  )
}

export default Login