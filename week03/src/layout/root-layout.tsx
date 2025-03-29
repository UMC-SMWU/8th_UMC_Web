import { Outlet } from 'react-router-dom'
import Navbar from '../components/NavigationBar'

const RootLayout = () => {
  return (
    <>
        <Navbar />
        <Outlet />
    </>
  )
}

export default RootLayout