import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state)=>state.auth.status);

  const navItems = [
    {
      name:"Home",
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "Signup",
      slug: "/signup",
      active:!authStatus
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus
    },
    {
      name: "Add Posts",
      slug: "/add-post",
      active: authStatus
    }
  ]

const headerStyle = {
  background: '#0f1724' // bg-slate-900 equivalent
}

  return (
    <header className='py-3 shadow-md' style={headerStyle}>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width = '56px'/>
            </Link>
          </div>
          <ul className='flex ml-auto text-slate-100 gap-2 justify-center items-center'>
            {
              navItems.map((item)=>
                item.active? (
                  <li key={item.name}>
                    <NavLink
                      to={item.slug}
                      className={({ isActive }) =>
                        `inline-block px-5 py-2 duration-200 rounded-xl hover:bg-slate-800  hover:shadow-lg hover:cursor-pointer text-slate-200 ${
                          isActive ? "bg-slate-800 text-yellow-400 font-semibold shadow" : ""
                        }`
                      }
                    >{item.name}</NavLink>
                  </li>
                ) : null
              )}
              {authStatus && <li><LogoutBtn/></li>}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header