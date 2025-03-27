import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
        <Link to="/">홈페이지로 이동</Link>
        <Link to="/movies">영화페이지로 이동</Link>
    </nav>
  )
}

export default Navbar