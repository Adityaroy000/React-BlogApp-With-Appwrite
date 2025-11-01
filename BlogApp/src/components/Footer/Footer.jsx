import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-slate-900">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width="100px" />
                            </div>
                            
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-slate-400">
                                Company
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link className="text-base font-medium text-slate-300 hover:text-violet-400" to="/">Features</Link>
                                </li>
                                <li className="mb-4">
                                    <Link className="text-base font-medium text-slate-300 hover:text-violet-400" to="/">Pricing</Link>
                                </li>
                                <li className="mb-4">
                                    <Link className="text-base font-medium text-slate-300 hover:text-violet-400" to="/">Affiliate Program</Link>
                                </li>
                                <li>
                                    <Link className="text-base font-medium text-slate-300 hover:text-violet-400" to="/">Press Kit</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-slate-400">
                                Support
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link className="text-base font-medium text-slate-300 hover:text-violet-400" to="/">Account</Link>
                                </li>
                                <li className="mb-4">
                                    <Link className="text-base font-medium text-slate-300 hover:text-violet-400" to="/">Help</Link>
                                </li>
                                <li className="mb-4">
                                    <Link className="text-base font-medium text-slate-300 hover:text-violet-400" to="/">Contact Us</Link>
                                </li>
                                <li>
                                    <Link className="text-base font-medium text-slate-300 hover:text-violet-400" to="/">Customer Support</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-slate-400">
                                Legals
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link className="text-base font-medium text-slate-300 hover:text-violet-400" to="/">Terms &amp; Conditions</Link>
                                </li>
                                <li className="mb-4">
                                    <Link className="text-base font-medium text-slate-300 hover:text-violet-400" to="/">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link className="text-base font-medium text-slate-300 hover:text-violet-400" to="/">Licensing</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='w-full p-6 md:w-full lg:w-full'>
                            <p className="text-sm font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 transition-transform duration-200 hover:scale-105 transform-gpu">
                                Made with ❤ by <a className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 hover:underline inline-block transition-transform duration-200" href="https://www.linkedin.com/in/aditya-roy-18" target="_blank" rel="noopener noreferrer">Aditya Roy</a>
                            </p>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Footer