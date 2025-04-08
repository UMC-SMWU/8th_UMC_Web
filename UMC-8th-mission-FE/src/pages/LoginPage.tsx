import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm"
import { UserSigninInformation, validateSignin } from "../utils/validate"
import { postSignin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { BsArrowLeftShort } from "react-icons/bs";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateSignin,
  });

  const handleSubmit = async () => {
    let response;
    try {
      response = await postSignin(values);
      console.log('로그인 요청:', response);
      setItem(response.data.accessToken);
      navigate("/my");
    } catch(e) {
      window.alert(response?.data);
    }
  };

  // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
  const isDisabled = 
    Object.values(errors || {}).some((error) => error.length >0) || // 오류가 있으면 true
    Object.values(values).some((value) => value === ""); // 값이 비어있으면 true

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 ">
      <div className="flex flex-col gap-3">
        <div className="relative flex items-center mb-6">
          <BsArrowLeftShort 
            className="absolute w-8 h-8 text-gray-100"
            onClick={() => {navigate(-1)}}
            style={{ cursor: "pointer" }}
          />
          <div className="mx-auto text-xl font-bold">
            로그인
          </div>
        </div>
        <button 
          type="button" 
          className="relative flex items-center w-full py-3 border border-[#96c0f0] p-[10px] rounded-sm text-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
        >
          <img src="src/assets/google.svg" alt="구글 아이콘" className="w-6 h-6 inline-block mr-2 absolute " />
          <div className="mx-auto">구글 로그인</div>
        </button>
        <div className="flex items-center gap-10 w-full py-2">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <input 
          {...getInputProps("email")}
          className={`border border-[#ccc] w-[300px] p-[10px] rounded-sm focus:border-[#96c0f0] focus:outline-none
          ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type="email"
          placeholder="이메일"
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-xs">{errors.email}</div>
        )}
        <input 
          {...getInputProps("password")}
          className={`border border-[#ccc] w-[300px] p-[10px] rounded-sm focus:border-[#96c0f0] focus:outline-none
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
          disabled={ isDisabled } 
          className="bg-[#96c0f0] text-white w-full py-3 p-[10px] rounded-sm text-lg hover:bg-[#96c0f0]/80 transition-colors duration-200 cursor-pointer disabled:bg-gray-300"
        >
          로그인
        </button>
      </div>
    </div>
  )
}

export default LoginPage
