// 1. HTML 요소 선택 (핸드북 자바스크립트 편 참고)
var todoInput = document.getElementById('todo-input');
var todoForm = document.getElementById('todo-form');
var todoList = document.getElementById('todo-list');
var doneList = document.getElementById('done-list');
var todos = [];
var doneTasks = [];
// - 할 일 목록 렌더링 하는 함수를 정의
var renderTasks = function () {
    todoList.innerHTML = '';
    doneList.innerHTML = '';
    todos.forEach(function (todo) {
        var li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });
    doneTasks.forEach(function (todo) {
        var li = createTodoElement(todo, true);
        doneList.appendChild(li); // ✅ 수정: doneList에 추가
    });
};
// 3. 할 일 텍스트 입력 처리 함수.
var getTodoText = function () {
    return todoInput.value.trim();
};
// 4. 할 일 추가 처리 함수
var addTodo = function (text) {
    todos.push({ id: Date.now(), text: text });
    todoInput.value = '';
    renderTasks(); //했으니까 렌더링 하라는 뜻.
};
// 5. 할 일 상태 변경 (완료로 이동)
var compeleteTodo = function (todo) {
    todos = todos.filter(function (t) { return t.id !== todo.id; });
    doneTasks.push(todo);
    renderTasks();
};
// 6. 완료된 할 일 삭제 함수.
var deleteTodo = function (todo) {
    doneTasks = doneTasks.filter(function (t) { return t.id !== todo.id; });
    renderTasks();
};
// 7. 할 일 아이템 생성 함수 (완료 여부에 따라 버튼 텍스트나 색상 설정)
var createTodoElement = function (todo, isDone) {
    var li = document.createElement('li');
    li.classList.add('render-container__item');
    var text = document.createElement('span');
    text.textContent = todo.text;
    var button = document.createElement('button');
    button.classList.add('render-container__item-button');
    if (isDone) {
        button.textContent = '삭제';
        button.classList.add('delete');
    }
    else {
        button.textContent = '완료';
        button.classList.add('complete');
    }
    button.addEventListener('click', function () {
        if (isDone) {
            deleteTodo(todo);
        }
        else {
            compeleteTodo(todo);
        }
    });
    li.appendChild(text);
    li.appendChild(button);
    return li;
};
// 8. 폼 제출 이벤트 리스너
todoForm.addEventListener('submit', function (event) {
    event.preventDefault(); //데이터 초기화 방지
    var text = getTodoText();
    if (text) {
        addTodo(text);
    }
});
renderTasks();
