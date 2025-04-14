import { useNavigate } from "react-router-dom";
import GoogleLogo from "../assets/google-logo.png"; 
import useForm from "../hooks/useForm.ts";
import { UserSigninInformation, validateSignin } from "../utils/validate.ts";

import { useAuth } from "../context/AuthContext.tsx";
import { useEffect } from "react";

const LoginPage = () => {
    const {login,accessToken} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (accessToken) {
          navigate("/", { replace: true });
        }
      }, [accessToken, navigate]);
    
    
    const handleBack = () => navigate(-1);
    const {
        values,
        errors,
        touched,
        getInputProps,
    } = useForm<UserSigninInformation>({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignin,
    });
    
    const handleSubmit = async () => {
        await login(values);
        navigate("/mypage");
    };
    

    //오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
    const isDisabled = 
    Object.values(errors || {}).some((error:string) => error.length>0) || // 오류가 있으면 true
    Object.values(values).some((value) => value === ""); // 입력값이 비어있으면 True

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <div className="flex flex-col items-center gap-6 bg-[#1e1e1e] p-10 rounded-md shadow-lg">
                <div className="relative w-full flex items-center justify-center mb-4">
                     <button
                           onClick={handleBack}
                           className="absolute left-0 text-white text-2xl focus:outline-none px-3"
                 >
                    &lt;
                     </button>
                      <h1 className="text-3xl font-bold text-center w-full">로그인</h1>
            </div>

                {/* 구글 로그인 버튼 */}
                <button
                   // onClick={handleGoogleLogin}
                    className="w-[300px] bg-white text-black py-3 px-4 rounded-md font-medium hover:bg-gray-200 transition-colors flex items-center gap-3"
                >
                    <img
                      src={GoogleLogo}
                      alt="Google Logo"
                      className="w-5 h-5 text-center"
                     />
                        Google 계정으로 로그인
                </button>

                <div className="flex items-center w-full gap-2 text-gray-400">
                    <div className="flex-grow h-px bg-gray-600" />
                    <span className="text-sm">OR</span>
                    <div className="flex-grow h-px bg-gray-600" />
                </div>

                <div className="flex flex-col gap-3">
                    <input
                        {...getInputProps("email")}
                        className={`border w-[300px] p-[10px] rounded-sm bg-[#2c2c2c] text-white
                        focus:border-[#807bff] focus:outline-none
                        ${errors?.email && touched?.email ? "border-red-500 bg-red-200 text-black" : "border-gray-600"}`}
                        type="email"
                        placeholder="이메일"
                    />
                    {errors?.email && touched?.email && (
                        <div className="text-red-400 text-sm">{errors.email}</div>
                    )}
                    <input
                        {...getInputProps("password")}
                        className={`border w-[300px] p-[10px] rounded-sm bg-[#2c2c2c] text-white
                        focus:border-[#807bff] focus:outline-none
                        ${errors?.password && touched?.password ? "border-red-500 bg-red-200 text-black" : "border-gray-600"}`}
                        type="password"
                        placeholder="비밀번호"
                    />
                    {errors?.password && touched?.password && (
                        <div className="text-red-400 text-sm">{errors.password}</div>
                    )}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isDisabled}
                        className="w-full bg-pink-600 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-700 transition-colors cursor-pointer disabled:bg-gray-500"
                    >
                        로그인
                    </button>
                    
                   

                </div>
            </div>
        </div>
    );
};

export default LoginPage;