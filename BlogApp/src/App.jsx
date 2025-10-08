import { useState,useEffect } from 'react'
import {Header,Footer} from './components'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {login,logout} from './store/authSlice'
import { Outlet } from 'react-router-dom'
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
      const checkCurrentUser = async () => {
        try {
          // We 'try' to get the current user.
          const userData = await authService.getCurrentUser();
          if (userData) {
            // If it succeeds, we log the user in (store the user object directly)
            dispatch(login(userData));
          } else {
            // If it succeeds but returns no user, we log out.
            dispatch(logout());
          }
        } catch (error) {
          // If it fails (which is expected for guests),
          // we 'catch' the error and ensure the state is logged out.
          dispatch(logout());
        } finally {
          // 'finally' runs no matter what, ensuring the loading screen is removed.
          setLoading(false);
        }
      };

      checkCurrentUser();
  }, [])

  return !loading? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
       <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ): null
  
}

export default App
