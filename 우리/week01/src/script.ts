// 1. HTML 요소 선택
const todoInput = document.getElementById('todo-input') as HTMLInputElement; // 태그가 어떤 태그인지 알려주기
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement; // 순서 없는 리스트 ul
const doneList = document.getElementById('done-list') as HTMLUListElement;

// 2. 할 일이 어떻게 생긴 것인지 type 정의
type Todo = {
    id: number;
    text: string;
};

let todos: Todo [] = []; // Todo의 배열을 따름
let doneTasks: Todo [] = [];

// - 할 일 목록 렌더링하는 함수 정의
const renderTasks = () : void => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';

    // 입력받은 값들 출력
    todos.forEach((todo) : void => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });

    doneTasks.forEach((todo) : void => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
}

// 3. 할 일 텍스트 입력 처리 함수, (공백 잘라줌)
const getTodoText = (): string => {
    return todoInput.value.trim();
}

// 4. 할 일 추가 처리 함수
const addTodo = (text: string) : void => {
    todos.push({id: Date.now(), text});
    todoInput.value = '';
    renderTasks(); // 추가 완료했으니 재랜더링
}

// 5. 할 일 상태 변경 (완료로 이동)
const completeTodo = (todo: Todo) : void => {
    todos = todos.filter((t): boolean => t.id !== todo.id); // 일치하지 않는 것 제외하고 다 보여주기
    doneTasks.push(todo);
    renderTasks();
}

// 6. 완료된 할 일 삭제 함수
const deleteTodo = (todo: Todo): void => {
    doneTasks = doneTasks.filter((t): boolean => t.id !== todo.id);
    renderTasks();
}

// 7. 할 일 아이템 생성 함수 (완료 여부에 따라 버튼 텍스트나 색상 설정)
const createTodoElement = (todo: Todo, isDone: Boolean) : HTMLElement => {
    const li = document.createElement('li');
    li.classList.add('render-container__item');
    li.textContent = todo.text; // todo에 입력한 값들 넣기

    const button = document.createElement('button');
    button.classList.add('render-container__item-button');

    if (isDone) {
        button.textContent = '삭제';
        button.style.backgroundColor = 'red';
    } else {
        button.textContent = '완료';
        button.style.backgroundColor = 'green';
    }

    button.addEventListener('click', (): void => {
        if (isDone) {
            deleteTodo(todo); // todo 삭제
        } else {
            completeTodo(todo); // todo 완료
        }
    });

    li.appendChild(button);
    return li; // node 타입 반드시 반환환
};

// 8. 폼 제출 이벤트 리스너
todoForm.addEventListener('submit', (event: Event): void => {
    event.preventDefault(); // 새로고침이 되므로 값이 초기화되는 것 방지
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});

renderTasks(); // 초기 렌더링