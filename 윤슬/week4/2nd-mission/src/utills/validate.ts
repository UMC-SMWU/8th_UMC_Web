export type UserSignInInformation = {
    email: string;
    password: string;
  };
  
  function validateUser(values: UserSignInInformation) {
    const errors: { email: string; password: string } = {
      email: "",
      password: "",
    };
  
    // 이메일 형식 체크
    if (
      !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
.test(values.email)
    ) {
      errors.email = "올바른 이메일 형식이 아닙니다!";
    }
  
    // 비밀번호 길이 체크 (8~20자 사이)
    if (
      !(values.password.length >= 8 && values.password.length < 20)
    ) {
      errors.password = "비밀번호는 8~20자 사이로 입력해주세요.";
    }
  
    return errors;
  }
  
  // 로그인 유효성 검사
function validateSignin(values: UserSignInInformation) {
    return validateUser(values);
  }
  
  export { validateSignin };
  