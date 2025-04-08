import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../assets/google-logo.png";
import profile from "../assets/profile.png";
import { useState } from "react";
import axios from "axios";

const emailSchema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다!",
    path: ["confirmPassword"],
  });

const nameSchema = z.object({
  name: z.string().min(1, { message: "닉네임을 입력해주세요" }),
});

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    watch,
  } = useForm({
    resolver:
      step === 1
        ? zodResolver(emailSchema)
        : step === 2
        ? zodResolver(passwordSchema)
        : zodResolver(nameSchema),
    mode: "onChange",
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = async (data: any) => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      try {
        const signupData = {
          email: getValues("email"),
          password: getValues("password"),
          name: getValues("name"),
        };
  
        const response = await axios.post("http://localhost:8000/v1/auth/signup", signupData);
        console.log("회원가입 성공:", response.data);
        alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다!");
        navigate("/login");
      } catch (error: any) {
        console.error("회원가입 실패:", error.response?.data || error.message);
        alert("회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  const handleBack = () => navigate(-1);

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
          <h1 className="text-3xl font-bold text-center w-full">회원가입</h1>
        </div>

        {step === 1 && (
          <>
            <button
              onClick={() => console.log("Google 로그인")}
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
          </>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {step === 1 && (
            <>
              <input
                {...register("email")}
                type="email"
                placeholder="이메일"
                className={`border w-[300px] p-[10px] rounded-sm bg-[#2c2c2c] text-white
                focus:border-[#807bff] focus:outline-none
                ${errors.email ? "border-red-500 bg-red-200 text-black" : "border-gray-600"}`}
              />
              {errors.email && (
                <span className="text-red-400 text-sm">
                  {errors.email.message}
                </span>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <div className="text-sm mb-1 text-gray-300">
                📨 {getValues("email")}
              </div>

              {/* 비밀번호 입력 */}
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요"
                  className={`border w-[300px] p-[10px] pr-10 rounded-sm bg-[#2c2c2c] text-white
                  focus:border-[#807bff] focus:outline-none
                  ${errors.password ? "border-red-500 bg-red-200 text-black" : "border-gray-600"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-400 text-sm">
                  {errors.password.message}
                </span>
              )}

              {/* 비밀번호 확인 입력 */}
              <div className="relative">
                <input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="비밀번호를 한번 더 입력해주세요"
                  className={`border w-[300px] p-[10px] pr-10 rounded-sm bg-[#2c2c2c] text-white
                  focus:border-[#807bff] focus:outline-none
                  ${
                    errors.confirmPassword
                      ? "border-red-500 bg-red-200 text-black"
                      : "border-gray-600"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400"
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-400 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </>
          )}

          {step === 3 && (
            <>
              <div className="flex flex-col items-center gap-2 mb-2">
                <img
                  src={profile}
                  alt="기본 프로필"
                  className="w-20 h-20 rounded-full object-cover border border-gray-500"
                />
              </div>
              <input
                {...register("name")}
                type="text"
                placeholder="닉네임을 입력해주세요"
                className={`border w-[300px] p-[10px] rounded-sm bg-[#2c2c2c] text-white
                focus:border-[#807bff] focus:outline-none
                ${errors.name ? "border-red-500 bg-red-200 text-black" : "border-gray-600"}`}
              />
              {errors.name && (
                <span className="text-red-400 text-sm">
                  {errors.name.message}
                </span>
              )}
            </>
          )}

          <button
            type="submit"
            disabled={
              (step === 1 && !isValid) ||
              (step === 2 && (!password || !confirmPassword || !isValid)) ||
              (step === 3 && !isValid)
            }
            className={`w-full py-3 rounded-md text-lg font-medium transition-colors
            ${
              (step === 1 && !isValid) ||
              (step === 2 && (!password || !confirmPassword || !isValid)) ||
              (step === 3 && !isValid)
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-pink-600 hover:bg-pink-700 text-white"
            }`}
          >
            {step === 3 ? "회원가입 완료" : "다음"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;