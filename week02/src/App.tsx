import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const handleIncreaseNumber = () => {
    // 이전 상태 값을 인자로 전달하여 업데이트
    setCount(prev => prev + 1);
  };

  const handleDecreaseNumber = () => {
    setCount(prev => prev - 1);
  };

  return (
    <>
      <h1>{count}</h1>
      <div>
        <button onClick={handleIncreaseNumber}>1 증가</button>
        <button onClick={handleDecreaseNumber}>1 감소</button>
      </div>
    </>
  );
}

export default App
