import TodoForm from "../components/TodoForm";
import TodoList from '../components/TodoList';
import { useTodo } from '../context/TodoContext';
import { THEME, useTheme } from '../context/ThemeProvider';
import clsx from 'clsx';

const Todo = (): Element => {
    const { todos, completeTodo, deleteTodo, doneTodos } = useTodo();
    const { theme } = useTheme(); // ✅ 다크 모드 여부 가져오기

    return (
        
        <div className={clsx('todo-container', {
            'bg-gray-100': theme === THEME.LIGHT, // light mode 배경
            'bg-gray-800': theme === THEME.DARK,  // dark mode 배경
        })}>
            <h1 className={clsx('todo-container__header', {
                'text-black': theme === THEME.LIGHT, // light mode 텍스트
                'text-white': theme === THEME.DARK,  // dark mode 텍스트
            })}>YONG TODO</h1>
            <TodoForm />
            <div className='render-container'>
                <TodoList
                    title='할 일'
                    todos={todos}
                    buttonLabel='완료'
                    buttonColor='#28a745'
                    onClick={completeTodo}
                />
                <TodoList
                    title='완료'
                    todos={doneTodos}
                    buttonLabel='삭제'
                    buttonColor='#dc3545'
                    onClick={deleteTodo}
                />
            </div>
        </div>
    );
};

export default Todo;