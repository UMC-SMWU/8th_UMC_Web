import ic_login_google from "../assets/ic_login_google.svg";
export default function GoogleLoginButton() {
  return (
    <div
      className="rounded-lg items-center w-full flex relative text-gray-300 border-gray-300 p-2 cursor-pointe border-[1px]"
      onClick={() => {}}
    >
      <img
        className="absolute left-4 size-6"
        src={ic_login_google}
        alt="Google Logo"
      />
      <span className="w-full text-center">구글 로그인</span>
    </div>
  );
}
