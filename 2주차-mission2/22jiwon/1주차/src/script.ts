const input = document.getElementById("todo-input") as HTMLInputElement;
const addBtn = document.getElementById("add-btn") as HTMLButtonElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

addBtn.addEventListener("click", () => {
  const value = input.value.trim();
  if (!value) return;

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

function moveToDoneList(item: HTMLLIElement) {
  item.removeChild(item.querySelector("button")!); 

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "삭제";
  deleteBtn.style.marginLeft = "10px";

  deleteBtn.addEventListener("click", () => {
    doneList.removeChild(item);
  });

  item.appendChild(deleteBtn);
  doneList.appendChild(item);
}
