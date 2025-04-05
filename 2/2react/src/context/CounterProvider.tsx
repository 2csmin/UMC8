import React from "react";
import { createContext, useContext, useState, ReactNode } from "react";

interface CounterContextType {
    count: number;
    handleIncrement: () => void;
    handleDecrement: () => void;
}

export const CounterContext = createContext<CounterContextType | undefined> (
    undefined
); // 전역 상태를 저장하는 객체

export const CounterProvider = ({ children }: { children: ReactNode }) => {
    const [count, setCount] = useState(0);

    const handleIncrement = () => setCount((prev) => prev + 1);
    const handleDecrement = () => setCount((prev) => prev - 1);

    return (
        <CounterContext.Provider // 하위 컴포넌트들에게 값 제공
            value={{ count, handleIncrement, handleDecrement }}
        >
            {children}
        </CounterContext.Provider>
    );
};

export const useCount = () => {
    const context = useContext(CounterContext);
    if (!context) {
        throw new Error(
            'useCount는 반드시 CountProvider 내부에서 사용되어야 합니다.'
        );
    }
    return context;
};