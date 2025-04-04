import { Link, NavLink } from 'react-router-dom'; // 'Link'는 사용되지 않음

const LINKS = [
  { to: '/', label: '홈' },
  { to: '/movies/popular', label: '인기 영화' },
  { to: '/movies/now_playing', label: '상영 중인 영화' },
  { to: '/movies/top_rated', label: '평점 높은 영화' },
  { to: '/movies/upcoming', label: '개봉 예정 영화' },
];

export const Navbar = (): React.ReactElement => {
  return (
    <div className='flex gap-3 p-4'>
      {LINKS.map(({ to, label }): React.ReactElement => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => {
            return isActive
              ? 'text-[#b2dab1] font-bold'
              : 'text-gray-500';
          }}
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
};
