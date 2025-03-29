// 1. HTML 요소 선택
const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

// 2. 할 일의 타입 정의
type Todo = {
  id: number;
  text: string;
};

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

// - 할일 목록 렌더링 하는 함수
const renderTasks = () => {
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  todos.forEach((todo) => {
    const li = createTodoElement(todo, false);
    todoList.appendChild(li);
  });

  doneTasks.forEach((todo) => {
    const li = createTodoElement(todo, true);
    doneList.appendChild(li);
  });
};

// 3. 할 일 텍스트 입력 처리 함수
const getTodoText = (): string => {
  return todoInput.value.trim();
};

// 4. 할 일 추가 처리 함수
const addTodo = (text: string) => {
  todos.push({
    id: todos.length + 1,
    text: text,
  });
  todoInput.value = "";
  renderTasks();
};

// 5. 할 일 상태 변경 (완료로 이동)
const completeTodo = (todo: Todo) => {
  todos = todos.filter((item) => item.id !== todo.id);
  doneTasks.push(todo);
  renderTasks();
};

// 6. 할 일 삭제 처리 함수
const deleteTodo = (todo: Todo) => {
  doneTasks = doneTasks.filter((item) => item.id !== todo.id);
  renderTasks();
};

// 7. 할 일 아이템 생성 함수 (완료 여부에 따라 텍스트나 색상 설정)
const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
  const li = document.createElement("li");
  li.classList.add("render-container__item");
  li.textContent = todo.text;

  const button = document.createElement("button");
  button.classList.add("render-container__item-button");

  if (isDone) {
    button.textContent = "삭제";
    button.style.backgroundColor = "#dc3545";
  } else {
    button.textContent = "완료";
    button.style.backgroundColor = "#28a745";
  }

  button.addEventListener("click", () => {
    if (isDone) {
      deleteTodo(todo);
    } else {
      completeTodo(todo);
    }
  });

  li.appendChild(button);
  return li;
};

// 8. 폼 제출 이벤트 리스너
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = getTodoText();
  if (text.length > 0) {
    addTodo(text);
  }
});

renderTasks();
