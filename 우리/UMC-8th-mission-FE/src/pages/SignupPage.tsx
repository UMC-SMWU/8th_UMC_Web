import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod"
import { postSignup } from "../apis/auth";

// validate.ts 에서 해야하는 과정 간단히
const schema = z.object({
  email: z.string().email({message: "올바른 이메일 형식이 아닙니다."}),
  password: z
    .string()
    .min(8, {
      message: "비밀번호는 8자 이상이어야 합니다.",
    })
    .max(20, {
      message: "비밀번호는 20자 이하이어야 합니다.",
    }),
  passwordCheck:z
    .string()
    .min(8, {
      message: "비밀번호는 8자 이상이어야 합니다.",
    })
    .max(20, {
      message: "비밀번호는 20자 이하이어야 합니다.",
    }),
  name: z.string().min(1, {message: "이름을 입력해주세요."})
})
.refine((data) => data.password === data.passwordCheck, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordCheck"],
})
;

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const {
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit:SubmitHandler<FormFields> = async (data) => {
    const { passwordCheck, ...rest} = data; // pwCheck 제외한 나머지 전송

    const response = await postSignup(rest);
    console.log('제출 요청:', response);
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 ">
      <div className="flex flex-col gap-3">
        <div className="relative flex items-center mb-6">
          <img 
            className="absolute w-5 h-5"
            src="src/assets/arrow.svg"
            onClick={() => {navigate(-1)}}
            style={{ cursor: "pointer" }}
          />
          <div className="mx-auto text-xl font-bold">
            회원가입
          </div>
        </div>
        <button 
          type="button" 
          className="relative flex items-center w-full py-3 border border-[#2c4629] p-[10px] rounded-sm text-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
        >
          <img src="src/assets/google.svg" alt="구글 아이콘" className="w-6 h-6 inline-block mr-2 absolute " />
          <div className="mx-auto">구글 로그인</div>
        </button>
        <div className="flex items-center gap-10 w-full py-2">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        {/* 이메일 입력 */}
        <input 
          {...register("email")}
          className={`border border-[#ccc] w-[300px] p-[10px] rounded-sm focus:border-[#3e623b] focus:outline-none
          ${errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type="email"
          placeholder="이메일"
        />
        {errors.email && <div className="text-xs text-red-500">{errors.email.message}</div>}
        {/* 비밀번호 입력 */}
        <input 
          {...register("password")}
          className={`border border-[#ccc] w-[300px] p-[10px] rounded-sm focus:border-[#3e623b] focus:outline-none
            ${errors?.password  ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type="password"
          placeholder="비밀번호"
        />
        {errors.password && <div className="text-xs text-red-500">{errors.password.message}</div>}
        {/* 비밀번호 확인 */}
        <input 
          {...register("passwordCheck")}
          className={`border border-[#ccc] w-[300px] p-[10px] rounded-sm focus:border-[#3e623b] focus:outline-none
            ${errors?.passwordCheck  ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type="password"
          placeholder="비밀번호확인"
        />
        {errors.passwordCheck && <div className="text-xs text-red-500">{errors.passwordCheck.message}</div>}
        {/* 이름 입력 */}
        <input 
          {...register("name")}
          className={`border border-[#ccc] w-[300px] p-[10px] rounded-sm focus:border-[#3e623b] focus:outline-none
            ${errors?.name  ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type="name"
          placeholder="이름"
        />
        {errors.name && <div className="text-xs text-red-500">{errors.name.message}</div>}
        {/* 제출 버튼 */}
        <button 
          type="button" 
          onClick={handleSubmit(onSubmit)} 
          disabled={ isSubmitting } 
          className="bg-[#2c4629] text-white w-full py-3 p-[10px] rounded-sm text-lg hover:bg-[#4a6d47]/80 transition-colors duration-200 cursor-pointer disabled:bg-gray-300"
        >
          회원가입
        </button>
      </div>
    </div>
  )
}

export default SignupPage
