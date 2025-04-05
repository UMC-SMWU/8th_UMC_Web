import useForm from "../hooks/useForm"
import { UserSigninInformation, validateSignin } from "../utils/validate"

const LoginPage = () => {
  const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateSignin,
  });

  const handleSubmit = () => {

  };

  // 오류가 하나라도 있거나, 입려값이 비어있으면 버튼을 비활성화
  const idDisabled = 
    Object.values(errors || {}).some((error) => error.length >0) || // 오류가 있으면 true
    Object.values(values).some((value) => value === ""); // 값이 비어있으면 true

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 ">
      <div className="flex flex-col gap-3">
        <input 
          {...getInputProps("email")}
          className={`border border-[#ccc] w-[300px] p-[10px] rounded-sm focus:border-[#3e623b] focus:outline-none
          ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type="email"
          placeholder="이메일"
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-xs">{errors.email}</div>
        )}
        <input 
          {...getInputProps("password")}
          className={`border border-[#ccc] w-[300px] p-[10px] rounded-sm focus:border-[#3e623b] focus:outline-none
            ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type="password"
          placeholder="비밀번호"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-xs">{errors.password}</div>
        )}
        <button 
          type="button" 
          onClick={ handleSubmit } 
          disabled={ idDisabled } 
          className="bg-[#2c4629] text-white w-full py-3 p-[10px] rounded-sm text-lg hover:bg-[#4a6d47]/80 transition-colors duration-200 cursor-pointer disabled:bg-gray-300"
        >
          로그인
        </button>
      </div>
    </div>
  )
}

export default LoginPage
