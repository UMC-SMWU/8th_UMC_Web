import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { postSignup } from "../api/AuthService";
import Header from "../components/Header";
import SubmitButton from "../components/SubmitButton";
import InputField from "../components/InputField";
import { useState } from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import ic_signup_profile from "../assets/ic_signup_profile.svg";
import ic_signup_email from "../assets/ic_signup_email.svg";
import { useNavigate } from "react-router-dom";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호 확인은 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호 확인은 20자 이하여야 합니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const email = watch("email");
  const password = watch("password");
  const passwordCheck = watch("passwordCheck");
  const name = watch("name");

  // 각 단계별로 필요한 필드만 검증
  const isEmailValid = !!email && !errors.email;
  const isPasswordValid =
    !!password && !!passwordCheck && !errors.password && !errors.passwordCheck;
  const isNameValid = !!name && !errors.name;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordCheck, ...rest } = data;
    const response = await postSignup(rest);
    console.log(response);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-4">
      <Header
        text="회원가입"
        onClick={() => {
          if (step === 1) navigate(-1);
          else setStep((prev) => prev - 1);
        }}
      />
      <div className="flex flex-col gap-3">
        {step === 1 && (
          <>
            <GoogleLoginButton />
            <div className="flex items-center justify-center w-[300px] text-gray-300 py-4">
              <div className="w-full h-[1px] bg-gray-300" />
              <p className="px-10">OR</p>
              <div className="w-full h-[1px] bg-gray-300" />
            </div>
            <InputField
              type="email"
              placeholder="이메일을 입력해주세요!"
              error={errors?.email?.message}
              touched={!!errors?.email}
              inputProps={register("email")}
            />
            <SubmitButton
              text="다음"
              onClick={() => setStep(2)}
              disabled={!isEmailValid}
            />
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex items-center gap-2">
              <img
                src={ic_signup_email}
                alt="이메일 아이콘"
                className="size-6 invert brightness-0 sepia"
              />
              <span className="text-gray-300">{email}</span>
            </div>
            <InputField
              type="password"
              placeholder="비밀번호"
              error={errors?.password?.message}
              touched={!!errors?.password}
              inputProps={register("password")}
            />
            <InputField
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해주세요."
              error={errors?.passwordCheck?.message}
              touched={!!errors?.passwordCheck}
              inputProps={register("passwordCheck")}
            />
            <SubmitButton
              text="다음"
              onClick={() => setStep(3)}
              disabled={!isPasswordValid}
            />
          </>
        )}

        {step === 3 && (
          <>
            <img
              src={ic_signup_profile}
              alt="프로필 이미지"
              className="flex justify-center w-full size-50 mb-10"
            />
            <InputField
              type="text"
              placeholder="이름"
              error={errors?.name?.message}
              touched={!!errors?.name}
              inputProps={register("name")}
            />
            <SubmitButton
              text="회원가입 완료"
              onClick={handleSubmit(onSubmit)}
              disabled={!isNameValid}
            />
          </>
        )}
      </div>
    </div>
  );
}
