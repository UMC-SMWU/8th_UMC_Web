import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import useForm from "../hooks/useForm";
import { UserSignInInformation, validateSignin } from "../utills/validate";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const { login, accessToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            navigate("/");
        }
    }, [navigate, accessToken]);


    const { values, errors, touched, getInputProps } = useForm<UserSignInInformation>({
        initialValue: {
          email: "",
          password: "",
        },
        validate: validateSignin,
      });
  
    const handleSubmit = async () => {
      await login(values);
      };

    const handleGoogleLogin = () => {
      window.location.href = `${import.meta.env.VITE_SERVER_API_URL}/auth/google/login`;
    };

  // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) || // 오류가 있으면 true
    Object.values(values).some((value) => value === "");             // 입력값이 비어있으면 true
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="w-full max-w-lg space-y-4"> {/* max-w-md → max-w-lg (512px) */}
    
          <div className="flex flex-col gap-3">
            <input
              {...getInputProps("email")}
              name="email"
              type="email"
              placeholder="이메일"
              className={`border w-full p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#807bff] ${
                errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"
              }`}
            />
            {errors?.email && touched?.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
    
            <input
              {...getInputProps("password")}
              type="password"
              placeholder="비밀번호"
              className={`border w-full p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#807bff] ${
                errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"
              }`}
            />
            {errors?.password && touched?.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
    
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isDisabled}
              className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:text-white disabled:cursor-not-allowed"
            >
              로그인
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full bg-white border border-gray-300 text-black py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors disabled:bg-gray-300 disabled:text-white disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center gap-2">
                <img src="/images/google.png" alt="Google Logo Image" className="w-5 h-5" />
                <span>구글 로그인</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
    
};

export default LoginPage;


