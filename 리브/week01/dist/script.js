"use strict";
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
addBtn.addEventListener("click", () => {
    const value = input.value.trim();
    if (!value)
        return;
    const li = document.createElement("li");
    li.textContent = value;
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "완료";
    doneBtn.style.marginLeft = "10px";
    doneBtn.addEventListener("click", () => {
        moveToDoneList(li);
    });
    li.appendChild(doneBtn);
    todoList.appendChild(li);
    input.value = "";
});
function moveToDoneList(item) {
    item.removeChild(item.querySelector("button"));
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.addEventListener("click", () => {
        doneList.removeChild(item);
    });
    item.appendChild(deleteBtn);
    doneList.appendChild(item);
}
