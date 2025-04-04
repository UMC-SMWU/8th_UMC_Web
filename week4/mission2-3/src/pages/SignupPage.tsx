import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { postSignup } from "../api/AuthService";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, {
        message: "비밀번호는 8자 이상이어야 합니다.",
      })
      .max(20, {
        message: "비밀번호는 20자 이하여야 합니다.",
      }),
    passwordCheck: z
      .string()
      .min(8, {
        message: "비밀번호 확인은 8자 이상이어야 합니다.",
      })
      .max(20, {
        message: "비밀번호 확인은 20자 이하여야 합니다.",
      }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { passwordCheck, ...rest } = data; // passwordCheck는 서버에 보낼 필요 없음
    const response = await postSignup(rest);
    console.log(response);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...register("email")}
          placeholder={"이메일"}
          className={`border border-[#ccc] w-[300px] p-[10px]
    focus:border-[#807bff] rounded-sm
    ${errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
        />
        {errors?.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}

        <input
          {...register("password")}
          type={"password"}
          placeholder={"비밀번호"}
          className={`border border-[#ccc] w-[300px] p-[10px]
        focus:border-[#807bff] rounded-sm
        ${errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
        />
        {errors?.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}

        <input
          {...register("passwordCheck")}
          type={"password"}
          placeholder={"비밀번호 확인"}
          className={`border border-[#ccc] w-[300px] p-[10px]
        focus:border-[#807bff] rounded-sm
        ${
          errors?.passwordCheck
            ? "border-red-500 bg-red-200"
            : "border-gray-300"
        }`}
        />
        {errors?.passwordCheck && (
          <span className="text-red-500 text-sm">
            {errors.passwordCheck.message}
          </span>
        )}

        <input
          {...register("name")}
          name="name"
          placeholder={"이름"}
          className={`border border-[#ccc] w-[300px] p-[10px]
        focus:border-[#807bff] rounded-sm
        ${errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"}`}
        />
        {errors?.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}

        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="w-full bg-black text-white p-[10px] rounded-sm hover:bg-[#807bff] transition-colors duration-200 disabled:bg-[#ccc]"
          type="button"
        >
          로그인
        </button>
      </div>
    </div>
  );
}
