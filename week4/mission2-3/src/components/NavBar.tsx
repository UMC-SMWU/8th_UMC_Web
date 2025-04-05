import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#0d0d0d]">
      <div className="flex-1">
        <h1
          className="text-2xl font-bold text-pink-600"
          onClick={() => navigate("/")}
        >
          돌려돌려LP판
        </h1>
      </div>
      <ul className="flex gap-4 items-center">
        <li className="text-white" onClick={() => navigate("/login")}>
          로그인
        </li>
        <li
          className="text-white px-2 py-1 bg-pink-600 rounded-sm"
          onClick={() => navigate("/signup")}
        >
          회원가입
        </li>
      </ul>
    </nav>
  );
}
