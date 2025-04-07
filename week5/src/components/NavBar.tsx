import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import NavButton from "./NavButton";

export default function NavBar() {
  const navigate = useNavigate();
  const { accessToken, logout } = useAuthContext();

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
      {accessToken ? (
        <section className="flex gap-4 items-center">
          <NavButton text="마이페이지" onClick={() => navigate("/mypage")} />
          <NavButton
            text="로그아웃"
            onClick={() => logout()}
            style="bg-pink-600"
          />
        </section>
      ) : (
        <section className="flex gap-4 items-center">
          <NavButton text="로그인" onClick={() => navigate("/login")} />
          <NavButton
            text="회원가입"
            onClick={() => navigate("/signup")}
            style="bg-pink-600"
          />
        </section>
      )}
    </nav>
  );
}
