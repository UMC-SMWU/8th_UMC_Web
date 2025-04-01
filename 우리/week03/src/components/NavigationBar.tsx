import { NavLink } from 'react-router-dom'

const LINKS = [
    {to: '/', label: '홈'},
    {to: '/movies/popular', label: '인기 영화'},
    {to: '/movies/upcoming', label: '상영중'},
    {to: '/movies/top_rated', label: '평점 높은'},
    {to: '/movies/now_playing', label: '개봉 예정'},
]

const Navbar = () => {
  return (
    <div className='flex gap-3 p-4'>
      {LINKS.map(({ to, label }) => (
        <NavLink
            key={to}
            to={to}
            className={({ isActive }) => {
                return isActive ? 'text-blue-500 font-bold' : 'text-gray-500 hover:text-blue-500 transition-colors duration-300'
            }}    
        >
            {label}
        </NavLink>
      ))}
    </div>
  )
}

export default Navbar