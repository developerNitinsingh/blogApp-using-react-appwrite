
import { useState, useEffect } from 'react'
import { useDispach } from 'react-redux'
import authService from "./appwrite/auth"
import './App.css'
import conf from './conf/conf'
import { login, logout } from "./store/authSlice"
import { Header, Footer } from './components'

function App() {
  const [loading, setLoading] = useState(true)
  const dispach = useDispach()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispach(login(userData))
        } else {
          dispach(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <Footer />
      </div>
    </div>) : null
}

export default App
