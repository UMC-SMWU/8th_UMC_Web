import "./App.css";
import List from "./components/List";

function App() {
  const nickname = "세라";
  const sweetPotato = "고구마";
  const array = ["REACT", "NEXT", "VUE", "SVELTE", "ANGULAR", "REACT-NATIVE"];
  return (
    <>
      <strong className="school">숙명여자대학교</strong>
      <p style={{ color: "purple", fontWeight: "bold", fontSize: "3rem" }}>
        {nickname}/이가을
      </p>
      <h1>{`${nickname}는 ${sweetPotato} 아이스크림을 좋아합니다.`}</h1>
      <ul>
        {array.map((item, index) => (
          <List key={index} tech={item} />
        ))}
      </ul>
    </>
  );
}

export default App;
