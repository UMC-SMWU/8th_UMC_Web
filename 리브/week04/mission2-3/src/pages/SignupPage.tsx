import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLocalStorage } from "../hooks/useLocalStorage";

// ✅ 이메일 스키마
const emailSchema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),
});
type EmailForm = z.infer<typeof emailSchema>;

// ✅ 비밀번호 스키마
const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });
type PasswordForm = z.infer<typeof passwordSchema>;

// ✅ 닉네임 스키마
const nameSchema = z.object({
  name: z.string().min(1, { message: "닉네임을 입력해주세요." }),
});
type NameForm = z.infer<typeof nameSchema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useLocalStorage("signupEmail", "");
  const [passwordValue, setPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [nicknameError, setNicknameError] = useState("");

  // 1단계: 이메일
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors, isValid: isEmailValid },
  } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
  });

  // 2단계: 비밀번호
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: pwErrors, isValid: isPwValid },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

  // 3단계: 닉네임
  const {
    register: registerName,
    handleSubmit: handleSubmitName,
    formState: { errors: nameErrors, isValid: isNameValid },
  } = useForm<NameForm>({
    resolver: zodResolver(nameSchema),
    mode: "onChange",
  });

  const onEmailSubmit = (data: EmailForm) => {
    setEmail(data.email);
    setStep(2);
  };

  const onPasswordSubmit = (data: PasswordForm) => {
    setPasswordValue(data.password);
    setStep(3);
  };

  const onNameSubmit = async (data: NameForm) => {
    try {
      setNicknameError("");
      const res = await fetch(`http://localhost:3000/v1/auth/exists/name/${data.name}`);
      const result = await res.json();

      if (result.isExist) {
        setNicknameError("이미 존재하는 닉네임입니다.");
        return;
      }

      const signupRes = await fetch("http://localhost:3000/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: passwordValue, name: data.name }),
      });

      if (!signupRes.ok) throw new Error("회원가입 실패");

      alert("회원가입이 완료되었습니다!");
      navigate("/login");
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center px-4">
      <div className="w-full max-w-sm flex flex-col gap-6">
        {/* 🔙 뒤로가기 + 제목 */}
        <div className="flex items-center gap-2 text-xl font-bold">
          <button onClick={() => navigate(-1)}>
            <IoChevronBackOutline />
          </button>
          <span>회원가입</span>
        </div>

        {/* 📧 이메일 입력 */}
        {step === 1 && (
          <>
            <button className="flex items-center justify-center gap-2 border border-white w-full py-2 rounded-md">
              <FaGoogle /> 구글 로그인
            </button>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-gray-400" />
              <span className="text-sm text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-400" />
            </div>
            <form onSubmit={handleSubmitEmail(onEmailSubmit)} className="flex flex-col gap-2">
              <input
                {...registerEmail("email")}
                placeholder="이메일을 입력해주세요!"
                className={`bg-black border w-full p-3 rounded-md text-white placeholder:text-gray-400 ${
                  emailErrors.email ? "border-red-500 bg-red-200 text-black" : "border-gray-500"
                }`}
              />
              {emailErrors.email && (
                <p className="text-red-500 text-sm">{emailErrors.email.message}</p>
              )}
              <button
                type="submit"
                disabled={!isEmailValid}
                className={`w-full py-3 rounded-md text-lg font-medium transition ${
                  isEmailValid ? "bg-pink-500 hover:bg-pink-600 text-white" : "bg-gray-700 text-gray-400"
                }`}
              >
                다음
              </button>
            </form>
          </>
        )}

        {/* 🔐 비밀번호 입력 */}
        {step === 2 && (
          <>
            <div className="text-sm text-gray-300">📧 {email}</div>
            <form onSubmit={handleSubmitPassword(onPasswordSubmit)} className="flex flex-col gap-4">
              {/* 비밀번호 */}
              <div className="relative">
                <input
                  {...registerPassword("password")}
                  placeholder="비밀번호를 입력해주세요!"
                  type={showPassword ? "text" : "password"}
                  className={`bg-black border w-full p-3 rounded-md text-white placeholder:text-gray-400 pr-10 ${
                    pwErrors.password ? "border-red-500 bg-red-200 text-black" : "border-gray-500"
                  }`}
                />
                <div
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
                {pwErrors.password && (
                  <p className="text-red-500 text-sm">{pwErrors.password.message}</p>
                )}
              </div>

              {/* 비밀번호 확인 */}
              <div className="relative">
                <input
                  {...registerPassword("confirmPassword")}
                  placeholder="비밀번호를 다시 한 번 입력해주세요!"
                  type={showConfirm ? "text" : "password"}
                  className={`bg-black border w-full p-3 rounded-md text-white placeholder:text-gray-400 pr-10 ${
                    pwErrors.confirmPassword ? "border-red-500 bg-red-200 text-black" : "border-gray-500"
                  }`}
                />
                <div
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
                {pwErrors.confirmPassword && (
                  <p className="text-red-500 text-sm">{pwErrors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={!isPwValid}
                className={`w-full py-3 rounded-md text-lg font-medium transition ${
                  isPwValid ? "bg-pink-500 hover:bg-pink-600 text-white" : "bg-gray-700 text-gray-400"
                }`}
              >
                다음
              </button>
            </form>
          </>
        )}

        {/* 🧑 닉네임 입력 + 프로필 */}
        {step === 3 && (
          <form onSubmit={handleSubmitName(onNameSubmit)} className="flex flex-col gap-4 items-center">
            {/* 프로필 이미지 + 텍스트 */}
            <div className="flex flex-col items-center gap-2">
              <img
                src="https://via.placeholder.com/100"
                alt="프로필 이미지"
                className="w-24 h-24 rounded-full"
              />
              <p className="text-sm text-white">프로필 이미지</p>
            </div>

            <input
              {...registerName("name")}
              placeholder="닉네임을 입력해주세요!"
              className={`bg-black border w-full p-3 rounded-md text-white placeholder:text-gray-400 ${
                nameErrors.name || nicknameError ? "border-red-500 bg-red-200 text-black" : "border-gray-500"
              }`}
            />
            {(nameErrors.name || nicknameError) && (
              <p className="text-red-500 text-sm">{nameErrors.name?.message || nicknameError}</p>
            )}
            <button
              type="submit"
              disabled={!isNameValid}
              className={`w-full py-3 rounded-md text-lg font-medium transition ${
                isNameValid ? "bg-pink-500 hover:bg-pink-600 text-white" : "bg-gray-700 text-gray-400"
              }`}
            >
              회원가입 완료
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupPage;






