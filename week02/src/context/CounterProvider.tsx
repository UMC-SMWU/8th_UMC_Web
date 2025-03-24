import { createContext, ReactNode, useContext, useState } from "react";

// 전역 상태관리

// Context 타입 정의
interface CounterContextType {
    count: number;
    handleIncrement: () => void;
    handleDecrement: () => void;
}

// Context 생성
export const CounterContext = createContext<CounterContextType | undefined>(
    undefined // 초기값 undefined로 설정 후 이후 Provider를 통해 값을 설정
);

// Context Provider 생성
export const CounterProvide = ({ children } : { children: ReactNode }) => {
    const [count, setCount] = useState(0);

    const handleIncrement = () => setCount(prev => prev+ 1 );
    const handleDecrement = () => setCount(prev => prev- 1 );

    return (
        <CounterContext.Provider
            value={{ count, handleIncrement, handleDecrement }}
        >
            {children}
        </CounterContext.Provider>
    )
};


// Context를 쉽게 가져오는 커스텀 훅
export const useCount = () => {
    const context = useContext(CounterContext);
    if (!context) {
      throw new Error(
        'useCount는 반드시 CountProvider 내부에서 사용되어야 합니다.'
      );
    }
    return context;
};
