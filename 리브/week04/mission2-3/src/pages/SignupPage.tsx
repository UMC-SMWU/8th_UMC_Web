import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { postSignup } from "../apis/auth";
// import { useLocalStorage } from "../hooks/useLocalStorage";
// import { LOCAL_STORAGE_KEY } from "../constants/key";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),
    password: z.string().min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." }),
    passwordCheck: z.string().min(8, { message: "비밀번호 확인은 최소 8자 이상이어야 합니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    watch,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  // const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const values = watch();

  const onSubmit = async (data: FormFields) => {
    try {
      const { passwordCheck, ...payload } = data;
      const response = await postSignup(payload);
      // setItem(response.data.accessToken);
      alert("회원가입 성공!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <input
              {...register("email")}
              placeholder="이메일을 입력해주세요!"
              className={`border w-full p-3 rounded-md ${
                errors.email ? "border-red-500 bg-red-200" : "border-gray-300"
              }`}
              type="email"
            />
            {errors.email && touchedFields.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <button
              type="button"
              disabled={!!errors.email || !values.email}
              onClick={() => setStep(2)}
              className={`w-full py-3 rounded-md mt-4 text-white font-bold ${
                !!errors.email || !values.email ? "bg-gray-600" : "bg-pink-500"
              }`}
            >
              다음
            </button>
          </>
        );
      case 2:
        return (
          <>
            <div className="text-white mb-2">📧 {values.email}</div>
            <div className="relative">
              <input
                {...register("password")}
                placeholder="비밀번호를 입력해주세요!"
                type={showPassword ? "text" : "password"}
                className={`border w-full p-3 rounded-md ${
                  errors.password ? "border-red-500 bg-red-200" : "border-gray-300"
                }`}
              />
              <button type="button" className="absolute top-3 right-3" onClick={() => setShowPassword((p) => !p)}>
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && touchedFields.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <div className="relative mt-4">
              <input
                {...register("passwordCheck")}
                placeholder="비밀번호를 다시 입력해주세요!"
                type={showPasswordCheck ? "text" : "password"}
                className={`border w-full p-3 rounded-md ${
                  errors.passwordCheck ? "border-red-500 bg-red-200" : "border-gray-300"
                }`}
              />
              <button type="button" className="absolute top-3 right-3" onClick={() => setShowPasswordCheck((p) => !p)}>
                {showPasswordCheck ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.passwordCheck && touchedFields.passwordCheck && (
              <p className="text-red-500 text-sm">{errors.passwordCheck.message}</p>
            )}

            <button
              type="button"
              disabled={!!errors.password || !!errors.passwordCheck || !values.password || !values.passwordCheck}
              onClick={() => setStep(3)}
              className={`w-full py-3 mt-4 rounded-md text-white font-bold ${
                !!errors.password || !!errors.passwordCheck || !values.passwordCheck
                  ? "bg-gray-600"
                  : "bg-pink-500"
              }`}
            >
              다음
            </button>
          </>
        );
      case 3:
        return (
          <>
            <div className="text-white mb-4">
              <div className="rounded-full bg-white w-24 h-24 mx-auto" />
            </div>
            <input
              {...register("name")}
              placeholder="닉네임을 입력해주세요!"
              className={`border w-full p-3 rounded-md ${
                errors.name ? "border-red-500 bg-red-200" : "border-gray-300"
              }`}
            />
            {errors.name && touchedFields.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="w-full py-3 mt-4 rounded-md text-white font-bold bg-pink-500"
            >
              회원가입 완료
            </button>
          </>
        );
    }
  };

  return (
    <div className="flex items-center justify-center h-dvh bg-black text-white px-4">
      <div className="w-full max-w-md flex flex-col gap-4">
        <div className="text-xl font-bold">회원가입</div>
        {renderStep()}
      </div>
    </div>
  );
};

export default SignupPage;
