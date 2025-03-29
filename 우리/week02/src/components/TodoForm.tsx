import { FormEvent, useState } from "react";
import { useTodo } from "../context/TodoContext";

const TodoForm = () => {
    const addTodo = useTodo().addTodo;
    const [input, setInput] = useState<string>("");
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const text = input.trim();
        if (text) {
            addTodo(text);
            setInput("");
        }
    };
    return (
        <div>
        <form onSubmit={handleSubmit} id="todo-form" className="todo-container__form">
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                id="todo-input"
                placeholder="할 일 입력"
                className="todo-container__input"
                required
            />
            <button type="submit" className="todo-container__button">
                추가
            </button>
        </form>
        </div>
    );
};

export default TodoForm;
