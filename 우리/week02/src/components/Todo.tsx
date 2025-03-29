import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useTodo } from "../context/TodoContext";
import { THEME, useTheme } from "../context/ThemeProvider";

const Todo = () => {
	const { todos, doneTodos, completeTodo, deleteTodo } = useTodo();
	const { theme } = useTheme();
	
	const isLightMode = theme === THEME.LIGHT;
	document.body.style.backgroundColor = isLightMode ? '#eef2f3' : '#333';
	const completeButtonColor = isLightMode ? '#28a745' : '#155724';
  	const deleteButtonColor = isLightMode ? '#dc3545' : '#721c24';

	return (
		<div className="todo-container">
		<h1 className="todo-container__header">TODO</h1>
			<TodoForm />
			<div className="render-container">
				<TodoList
					title="할 일"
					todos={todos}
					buttonLabel="완료"
					buttonColor={completeButtonColor}
					onClick={completeTodo}
				/>
				<TodoList
					title="완료한 일"
					todos={doneTodos}
					buttonLabel="삭제"
					buttonColor={deleteButtonColor}
					onClick={deleteTodo}
				/>
			</div>
		</div>
	);
};
export default Todo;