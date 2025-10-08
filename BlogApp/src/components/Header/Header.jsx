import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
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
  background: 'linear-gradient(160deg, #1C1C1E)'
}

  return (
    <header className='py-3 shadow' style={headerStyle}>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width = '56px'/>
            </Link>
          </div>
          <ul className='flex ml-auto text-white gap-2 justify-center items-center'>
            {
              navItems.map((item)=>
                item.active? (
                  <li key={item.name}>
                    <button
                      onClick={()=>navigate(item.slug)}
                      className='inline-block px-6 py-2 duration-200 hover:bg-gray-800 rounded-full bg-gray-700 hover:cursor-pointer'
                    >{item.name}</button>
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