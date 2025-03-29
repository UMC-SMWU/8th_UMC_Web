import { createContext, FormEvent, PropsWithChildren, useContext, useState } from "react";
import { TTodo } from "../types/todo";

interface ITodoContext {
    todos: TTodo[];
    doneTodos: TTodo[];
    addTodo: (text: string) => void;
    completeTodo: (todo: TTodo) => void;
    deleteTodo: (todo: TTodo) => void;
}

const TodoForm = ({ input, setInput, handleSubmit }: TodoFormProps) : Element => {
    const [input, setInput] = useState<string>('')

        const handleSubmit = (e: FormEvent<HTMLFormElement>) : void => {
            e.preventDefault(); //자동 새로 고침 방지
            const text = input.trim();
    
            if (text) {
                addTodo(text);
                setInput('') //입력 후엔 공백으로 바꾸기.
            }
        };
}

export const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const TodoProvider = ({ children }: PropsWithChildren) : Element => {
    const [todos, setTodos] = useState<TTodo[]>([
            ]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([
            ]);

    const addTodo = (text: string) : void => {
        const newTodo : TTodo = { id: Date.now(), text };
        setTodos((prevTodos) : TTodo[] => [...prevTodos, newTodo]); //기존에 있던 것들은 유지하고 새로운 것들만 더 넣어주면 된다.
    };

    const completeTodo = (todo: TTodo) : void => {
        setTodos((prevTodos) : TTodo[] => prevTodos.filter((t) : boolean => t.id !== todo.id)); //완료를 누르지 않은 애들만 남긴다!
        setDoneTodos((prevDoneTodos) : TTodo[] => [...prevDoneTodos, todo]);
    };

    const deleteTodo = (todo: TTodo) : void => {
        setDoneTodos((prevDoneTodos) : TTodo[] => prevDoneTodos.filter((t) : boolean => t.id !== todo.id));
    };
    
    return <TodoContext.Provider value={{todos, doneTodos, addTodo, completeTodo, deleteTodo}}>{children}</TodoContext.Provider>;
};

export const useTodo = () : void => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error(
            'useTodo를 사용하기 위해서는, 무조건 TodoProvider로 감싸야 합니다.'
        );
    }
        const context: ITodoContext

    return context;
};