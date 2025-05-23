import { FormEvent, useState } from "react";
import { TTodo } from "../types/todo";

const TodoBefore = () => {
    const [todos, setTodos] = useState<TTodo[]>([]);
    const [donetodos, setDonetodos] = useState<TTodo[]>([]);
    const [input, setInput] = useState<string>('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const text = input.trim(); // 앞의 공백 제거

        if (text) {
            const newTodo: TTodo = {id: Date.now(), text};
            setTodos((prevTodos) => [...prevTodos, newTodo]);
            setInput('');
        }
    };

    const completeTodo = (todo: TTodo) => {
        setTodos(prevTodos => prevTodos.filter((t) => t.id !== todo.id));
        setDonetodos((prevDonetodos) => [...prevDonetodos, todo]);
    };

    const deleteTodo =(todo: TTodo) => {
        setDonetodos(prevTodos => prevTodos.filter((t) => t.id !== todo.id));
    }

    return (
        <div className="todo-container">
            <h1 className="todo-container__header">TODO</h1>
            <form onSubmit={handleSubmit} className="todo-container__form">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    className="todo-container__input"
                    placeholder="할 일 입력"
                    required
                />
                <button type="submit" className="todo-container__button">
                    Add
                </button>
            </form>
            <div className="render-container">
                <div className="render-container__section">
                    <h2 className="render-container__title">할 일</h2>
                    <ul id="todo-list" className="render-container__list">
                        {todos.map((todo) => (
                            <li key={todo.id} className="render-container__item">
                            <span className="render-container__item-text">
                                {todo.text}
                            </span>
                            <button 
                                onClick={() => completeTodo(todo)}
                                style={{
                                    backgroundColor: '#28a745',
                                }}
                                className="render-container__item-button"
                            >
                                완료
                            </button>
                        </li>
                        ))}
                    </ul>
                </div>
                <div className="render-container__section">
                    <h2 className="render-container__title">완료</h2>
                    <ul id="todo-list" className="render-container__list">
                        {donetodos.map((todo) => (
                                <li key={todo.id} className="render-container__item">
                                <span className="render-container__item-text">
                                    {todo.text}
                                </span>
                                <button
                                    onClick={() => deleteTodo(todo)}
                                    style={{
                                        backgroundColor: '#dc3545',
                                    }}
                                    className="render-container__item-button"
                                >
                                    삭제
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default TodoBefore;
