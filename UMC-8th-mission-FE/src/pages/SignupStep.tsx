import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { postSignup } from "../apis/auth";
import { useState } from "react";
import { MdEmail, MdPerson } from "react-icons/md";
import { BsArrowLeftShort } from "react-icons/bs";

// 유효성 검사 스키마 정의
const schema = z.object({
  email: z
    .string()
    .nonempty({ message: "이메일을 입력해주세요." }) // 비어 있는 경우 에러 메시지
    .email({ message: "올바른 이메일 형식이 아닙니다." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
    .max(20, { message: "비밀번호는 20자 이하이어야 합니다." }),
  passwordCheck: z
    .string()
    .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
    .max(20, { message: "비밀번호는 20자 이하이어야 합니다." }),
  name: z.string().min(1, { message: "이름을 입력해주세요." }),
}).refine((data) => data.password === data.passwordCheck, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordCheck"],
});

type FormFields = z.infer<typeof schema>;

const SignupStep = () => {
  const [step, setStep] = useState(1); // 현재 단계 (1: 이메일, 2: 비밀번호, 3: 이름)
  const [emailValue, setEmailValue] = useState(""); // 입력된 이메일 값
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
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

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { passwordCheck, ...rest } = data; // pwCheck 제외한 나머지 전송
    const response = await postSignup(rest);
    console.log("제출 요청:", response);
    navigate("/login"); // 회원가입 성공 시 로그인 페이지로 이동
  };

  const [isShowPassword, setIsShowPassword] = useState(false); // 비밀번호 보이기 상태

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <div className="relative flex items-center mb-4">
          <BsArrowLeftShort 
            className="absolute w-8 h-8 text-gray-100"
            onClick={() => {navigate(-1)}}
            style={{ cursor: "pointer" }}
          />
          <div className="mx-auto text-xl font-bold">회원가입</div>
        </div>

        {/* 1단계: 이메일 입력 */}
        {step === 1 && (
          <div className="flex flex-col gap-3">
            <input
              {...register("email")}
              className={`border border-[#ccc] w-[300px] p-[10px] rounded-sm focus:border-[#96c0f0] focus:outline-none
              ${errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
              type="email"
              placeholder="이메일"
            />
            {errors.email && (
              <div className="text-xs text-red-500">{errors.email.message}</div>
            )}
            <button
              type="button"
              onClick={() => {
                if (!errors.email) {
                  setEmailValue(getValues("email")); // 이메일 값 저장
                  setStep(2); // 다음 단계로 이동
                }
              }}
              disabled={!!errors.email}
              className="bg-[#96c0f0] text-white w-full py-3 p-[10px] rounded-sm text-lg hover:bg-[#96c0f0]/80 transition-colors duration-200 cursor-pointer disabled:bg-gray-300"
            >
              다음
            </button>
          </div>
        )}

        {/* 2단계: 비밀번호 입력 */}
        {step === 2 && (
          <div className="flex flex-col gap-3">
            {/* 이메일 표시 */}
            <div className="flex items-center gap-2 mb-2">
              <MdEmail className="mx-1"/>
              <div >
                {emailValue}
              </div>
            </div>
            <div className="relative flex items-center justify-end">
              <input 
                {...register("password")}
                className={`border border-[#ccc] w-[300px] p-[10px] rounded-sm focus:border-[#96c0f0] focus:outline-none
                  ${errors?.password  ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                type={isShowPassword ? "text" : "password"}
                placeholder="비밀번호"
              />
              <img 
                className="absolute w-5 cursor-pointer mx-auto right-3"
                src={isShowPassword ? "src/assets/eyeopen.svg" : "src/assets/eyeclose.svg"} 
                onClick={() => setIsShowPassword(!isShowPassword)}
              />
            </div>
            {errors.password && (
              <div className="text-xs text-red-500">{errors.password.message}</div>
            )}
            <div className="relative flex items-center justify-end">
              <input 
                {...register("passwordCheck")}
                className={`border border-[#ccc] w-[300px] p-[10px] rounded-sm focus:border-[#96c0f0] focus:outline-none
                  ${errors?.passwordCheck  ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                type={isShowPassword ? "text" : "password"}
                placeholder="비밀번호확인"
              />
              <img 
                  className="absolute w-5 cursor-pointer mx-auto right-3"
                  src={isShowPassword ? "src/assets/eyeopen.svg" : "src/assets/eyeclose.svg"} 
                  onClick={() => setIsShowPassword(!isShowPassword)}
              />
            </div>
            {errors.passwordCheck && (
              <div className="text-xs text-red-500">
                {errors.passwordCheck.message}
              </div>
            )}
            <button
              type="button"
              onClick={() => {
                if (!errors.password && !errors.passwordCheck) {
                  setStep(3); // 다음 단계로 이동
                }
              }}
              disabled={!!errors.password || !!errors.passwordCheck}
              className="bg-[#96c0f0] text-white w-full py-3 p-[10px] rounded-sm text-lg hover:bg-[#96c0f0]/80 transition-colors duration-200 cursor-pointer disabled:bg-gray-300"
            >
              다음
            </button>
          </div>
        )}

        {/* 3단계: 이름 입력 */}
        {step === 3 && (
          <div className="flex flex-col gap-3 items-center">
            <div className="flex items-center justify-center w-60 h-60 bg-gray-100 rounded-full my-4">
              <MdPerson className="text-gray-800 text-[150px]" />
            </div>
            <input
              {...register("name")}
              className={`border border-[#ccc] w-[300px] p-[10px] rounded-sm focus:border-[#96c0f0] focus:outline-none
                ${errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"}`}
              type="text"
              placeholder="이름"
            />
            {errors.name && (
              <div className="text-xs text-red-500">{errors.name.message}</div>
            )}
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="bg-[#96c0f0] text-white w-full py-3 p-[10px] rounded-sm text-lg hover:bg-[#6c9ace]/80 transition-colors duration-200 cursor-pointer disabled:bg-gray-300"
            >
              회원가입 완료
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupStep;