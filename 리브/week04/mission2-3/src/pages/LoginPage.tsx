import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserSignInformation, validateSignin } from "../utils/validate";
import { FaGoogle } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";  
import { useEffect } from "react";  
import { useLogin } from "../hooks/mutations/useLogin";

const LoginPage = () => {
  const {login, accessToken}=useAuth();
  const navigate = useNavigate();
  const { mutateAsync: loginMutate } = useLogin();

  useEffect(() => {
    if (accessToken) {
      navigate("/my");  
    } else {
      navigate("/login");
    }
  }, [navigate, accessToken]);  
  

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    watch,
  } = useForm<UserSignInformation>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const values = watch();  

  const onSubmit = async () => {
    try {
      await loginMutate(values);
      await login(values);
      navigate("/my");
    } catch (error) {
      alert("로그인 실패");
      console.log(error);
    }
  };

  const handleGoogleLogin=()=> {
    window.location.href=import.meta.env.VITE_SERVER_API_URL+"/v1/auth/google/login";
  };

  const isDisabled =
    Object.values(errors).some((error) => error?.message) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex flex-col items-center justify-center h-dvh bg-black text-white px-4">
      <div className="w-full max-w-md flex flex-col gap-6">
        {/* 뒤로가기 버튼 + 로그인 텍스트를 나란히 */}
        <div className="flex items-center gap-2 text-white text-xl font-bold">
          <button onClick={() => navigate(-1)}>
            <IoChevronBackOutline />
          </button>
          <span>로그인</span>
        </div>

        {/* 구글 로그인 버튼 */}
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 border border-white w-full py-2 rounded-md hover:bg-white hover:text-black transition"
        >
          <FaGoogle /> 구글 로그인
        </button>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-400" />
          <span className="text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-400" />
        </div>

        {/* 이메일 입력 */}
        <input
          {...register("email", {
            validate: (value) => {
              const error = validateSignin({ ...values, email: value }).email;
              return error || true;
            },
          })}
          name="email"
          className={`bg-black border w-full p-3 rounded-md placeholder:text-gray-400 focus:border-pink-400 text-white ${
            errors.email && touchedFields.email
              ? "border-red-500 bg-red-200 text-black"
              : "border-gray-500"
          }`}
          type="email"
          placeholder="이메일을 입력해주세요!"
        />
        {errors.email && touchedFields.email && (
          <p className="text-red-500 text-sm mt-[-12px]">
            {errors.email.message || "올바른 이메일 형식이 아닙니다!"}
          </p>
        )}

        {/* 비밀번호 입력 */}
        <input
          {...register("password", {
            validate: (value) => {
              const error = validateSignin({ ...values, password: value }).password;
              return error || true;
            },
          })}
          name="password"
          className={`bg-black border w-full p-3 rounded-md placeholder:text-gray-400 focus:border-pink-400 text-white ${
            errors.password && touchedFields.password
              ? "border-red-500 bg-red-200 text-black"
              : "border-gray-500"
          }`}
          type="password"
          placeholder="비밀번호를 입력해주세요!"
        />
        {errors.password && touchedFields.password && (
          <p className="text-red-500 text-sm mt-[-12px]">
            {errors.password.message || "비밀번호는 8자 이상이어야 합니다."}
          </p>
        )}

        {/* 로그인 버튼 */}
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isDisabled}
          className={`w-full py-3 rounded-md text-lg font-medium transition ${
            isDisabled
              ? "bg-gray-700 text-gray-400"
              : "bg-pink-500 hover:bg-pink-600 text-white"
          }`}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;







  
