import { FormEvent, useState } from "react";
import { TTodo } from '../types/todo';

const TodoBefore = () : React.ReactElement => {
    const [todos, setTodos] = useState<TTodo[]>([
    ]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([
    ]);
    const [input, setInput] = useState<string>('')

    console.log('Input', input);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) : void => {
        e.preventDefault(); //자동 새로 고침 방지
        console.log('동작함');
        const text = input.trim();

        if (text) {
            const newTodo: TTodo = { id: Date.now(), text };
            setTodos((prevTodos) : TTodo[] => [...prevTodos, newTodo]); //기존에 있던 것들은 유지하고 새로운 것들만 더 넣어주면 된다.
            setInput('') //입력 후엔 공백으로 바꾸기.
        }
    };

    const completeTodo = (todo: TTodo) : void => {
        setTodos((prevTodos) : TTodo[] => prevTodos.filter((t) : boolean => t.id !== todo.id)); //완료를 누르지 않은 애들만 남긴다!
        setDoneTodos((prevDoneTodos) : TTodo[] => [...prevDoneTodos, todo]);
    };

    const deleteTodo = (todo: TTodo) : void => {
        setDoneTodos((prevDoneTodos) : TTodo[] => prevDoneTodos.filter((t) : boolean => t.id !== todo.id));
    };

    return (
        <div className="todo-container">
            <h1 className="todo-container__header">SY TODO</h1>
            <form onSubmit={handleSubmit} className="todo-container__form">
                <input value={input} onChange={(e) : void => setInput(e.target.value)} type='text' className='todo-container__input' placeholder="할 일 입력" required></input> 
                <button type='submit' className="todo-container__button">할 일 추가</button>
            </form>
            <div className='render-container'>
                <div className="render-container__section">
                    <h2 className="render-container__title">할 일</h2>
                    <ul id='todo-list' className="render-container__list">
                        {todos.map((todo): React.ReactElement => (
                            <li key={todo.id} className="render-container__item">
                                <span className="render-container__item-text">{todo.text}</span>
                                <button onClick={() : void => completeTodo(todo)} style={{backgroundColor: '#28a745'}}className="render-container__item-button.delete">완료</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="render-container__section">
                    <h2 className="render-container__title">완료</h2>
                    <ul id='todo-list' className="render-container__list">
                        {doneTodos.map((todo): React.ReactElement => (
                            <li key={todo.id} className="render-container__item">
                                <span className="render-container__item-text">{todo.text}</span>
                                <button onClick={() : void => deleteTodo(todo)} style={{backgroundColor: '#dc3545'}}className="render-container__item-button.delete">삭제</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TodoBefore