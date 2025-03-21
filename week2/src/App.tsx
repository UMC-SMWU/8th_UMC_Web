import "./App.css";
import { useState } from "react";

function App() {
  const [person, setPerson] = useState({
    name: "이가을",
    age: 24,
    nickname: "세라",
    city: "",
  });

  const updateCity = () => {
    setPerson((prev) => ({ ...prev, city: "서울" }));
  };

  const increaseAge = () => {
    setPerson((prev) => ({ ...prev, age: prev.age + 1 }));
  };

  const decreaseAge = () => {
    setPerson((prev) => ({ ...prev, age: prev.age - 1 }));
  };

  return (
    <>
      <h1>이름: {person.name}</h1>
      <h2>나이: {person.age}</h2>
      <h3>닉네임: {person.nickname}</h3>
      {/* 도시가 있을 경우에만 렌더링 */}
      {person.city && <h4>도시: {person.city}</h4>}
      <button onClick={updateCity}>도시 추가/변경</button>
      <button onClick={increaseAge}>나이 증가</button>
      <button onClick={decreaseAge}>나이 감소</button>
    </>
  );
}

export default App;
