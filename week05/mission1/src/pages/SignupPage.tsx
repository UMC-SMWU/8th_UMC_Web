import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../assets/google-logo.png";
import { postSignup } from "../apis/auth";

const schema = z.object({
  email:z.string().email({ message: "올바른 이메일 형식이 아닙니다" }),
  password: z
  .string()
  .min(8, { message: "비밀번호는 8자 이상이어야 합니다" })
  .max(20, { message: "비밀번호는 20자 이하이어야 합니다" }),
  passwordCheck: z
  .string()
  .min(8, { message: "비밀번호는 8자 이상이어야 합니다" })
  .max(20, { message: "비밀번호는 20자 이하이어야 합니다" }),
  name:z
  .string()
  .min(1, { message: "이름을 입력해주세요" })
})
.refine((data) => data.password === data.passwordCheck, {
  message: "비밀번호가 일치하지 않습니다",
  path: ["passwordCheck"],
});

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState:{errors, isSubmitting},
  } = useForm<FormFields>({
    defaultValues:{
      name:"",
      email:"",
      password:"",
      passwordCheck:"",
    },
    resolver:zodResolver(schema),
    mode: "onBlur",
  });


  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    const { passwordCheck, ...rest} = data;
    try {
      const response = await postSignup(rest);
      console.log("회원가입 성공:", response);
      navigate("/login"); // 예시
    } catch (error: any) {
      if (error.response?.status === 409) {
        alert(error.response.data.message || "이미 존재하는 이메일입니다.");
      } else {
        alert("회원가입 중 오류가 발생했습니다.");
      }
      console.error("회원가입 에러:", error);
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
                {...register("email")}
                className={`border w-[300px] p-[10px] rounded-sm bg-[#2c2c2c] text-white
                ${errors?.email ? "border-red-500 bg-red-200 text-black" : "border-gray-600"}`}
                type={"email"}
                placeholder={"이메일"}
            />
            {errors.email && (
              <div className = {"text-red-500 text-sm"}>{errors.email.message}</div>
            )}
            <input
                {...register("password")}
                className={`border w-[300px] p-[10px] rounded-sm bg-[#2c2c2c] text-white
                focus:border-[#807bff] focus:outline-none
                ${errors?.password ? "border-red-500 bg-red-200 text-black" : "border-gray-600"}`}
                type={"password"}
                placeholder={"비밀번호"}
            />
            {errors.password && (
              <div className = {"text-red-500 text-sm"}>{errors.password.message}</div>
            )}
             <input
                {...register("passwordCheck")}
                className={`border w-[300px] p-[10px] rounded-sm bg-[#2c2c2c] text-white
                focus:border-[#807bff] focus:outline-none
                ${errors?.passwordCheck ? "border-red-500 bg-red-200 text-black" : "border-gray-600"}`}
                type={"password"}
                placeholder={"비밀번호 확인"}
            />
            {errors.passwordCheck && (
              <div className = {"text-red-500 text-sm"}>{errors.passwordCheck.message}</div>
            )}
            <input
                {...register("name")}
                className={`border w-[300px] p-[10px] rounded-sm bg-[#2c2c2c] text-white
                focus:border-[#807bff] focus:outline-none
                ${errors?.name ? "border-red-500 bg-red-200 text-black" : "border-gray-600"}`}
                type={"name"}
                placeholder={"이름"}
            />
             {errors.name && (
              <div className = {"text-red-500 text-sm"}>{errors.name.message}</div>
            )}

            <button
                disabled = {isSubmitting}
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="w-full bg-pink-600 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-700 transition-colors cursor-pointer disabled:bg-gray-500"
            >
                회원가입
            </button>
           

        </div>
    </div>
</div>
  );
}

export default SignupPage;