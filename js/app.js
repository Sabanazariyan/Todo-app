const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const alertMessage = document.getElementById("alert-message");
const todosBody = document.querySelector("tbody");
const deleteAllButton = document.getElementById("delete-all-button");
const editButton = document.getElementById("edit-button");

// ارایه اصلی تودوز اطلاعات خود را از لوکال استوریج میگیرد
//اگر برای بار اول اجرا میشد و لوکال استوریج خالی بود یا قرار میدهیم و یک ارایه خالی میگذاریم
let todos = JSON.parse(localStorage.getItem("todos")) || [];

const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const generateId = () => {
  return Math.round(
    Math.random() * Math.random() * Math.pow(10, 15)
  ).toString();
};

//ورودی های تایع یکی برای وارد کردن متن پیام و یکی برای استایل دهی به رنگ پیام
const showAlert = (message, type) => {
  // هربار که یک پیام ایجاد میشود قبلی را پاک میکند
  alertMessage.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerText = message;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertMessage.append(alert);

  // بعد از 2 ثانیه پیام را پاک میکند
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

const displayTodos = () => {
  todosBody.innerHTML = "";
  if (!todos.length) {
    todosBody.innerHTML = "<tr><td colspan='4'>No task found !</td></tr>";
    return;
  }

  todos.forEach((todo) => {
    todosBody.innerHTML += `
    <tr>
        <td>${todo.task}</td>
        <td>${todo.date || "No Date"}</td>
        <td>${todo.completed ? "Completed" : "Pending"}</td>
        <td>
        <button onclick="editHandler('${todo.id}')">Edit</button>
        <button onclick="toggleHandler('${todo.id}')">
          ${todo.completed ? "Undo" : "Do"}
        </button>
        <button onclick="deleteHandler('${todo.id}')">Delete</button>
        </td>
    </tr>
    `;
  });
};

const addHandler = () => {
  const task = taskInput.value;
  const date = dateInput.value;
  //دومی ها مقادیری هستند که کاربر وارد کرده و ما دریافت کردیم
  const todo = {
    //ایدی مساوی با ان تابع تولید عدد رندوم ایدی
    id: generateId(),
    task: task,
    date: date,
    completed: false,
  };
  //حتما متن تودو باید وارد شود ولی تاریخ میتواند خالی باشد
  if (task) {
    // بعد اضافه کردن تودو به لیست تودوز مقادیر اینپوت را خالی کن
    todos.push(todo);
    saveToLocalStorage();
    displayTodos();
    taskInput.value = "";
    dateInput.value = "";
    showAlert("Todo added successfully", "success");
  } else {
    //استفاده از تایع بالا و وارد کردن مقادیر ورودی و تایپ پیام
    showAlert("please enter a todo !", "error");
  }
};

const deleteAllHandler = () => {
  if (todos.length) {
    todos = [];
    saveToLocalStorage();
    displayTodos();
    showAlert("All todos cleard successfully", "success");
  } else {
    showAlert("No todos to clear", "error");
  }
};

const deleteHandler = (id) => {
  const newTodos = todos.filter((todo) => todo.id !== id);
  todos = newTodos;
  saveToLocalStorage();
  displayTodos();
  showAlert("Todo deleted successfully", "success");
};

const toggleHandler = (id) => {
  // const newTodos = todos.map((todo) => {
  //   if (todo.id === id) {

  //راه دوم
  // return {
  //   ...todo,
  //   completed: !todo.completed,
  // };

  //راه اول
  // return {
  //   id: todo.id,
  //   task: todo.task,
  //   date: todo.date,
  //   completed: !todo.completed,
  // };

  //   } else {
  //     return todo;
  //   }
  // });
  // todos = newTodos;

  //راه سوم و بهترین و بهینه ترین
  const todo = todos.find((todo) => todo.id === id);
  todo.completed = !todo.completed;
  saveToLocalStorage();
  displayTodos();
  showAlert("Todo status changed successfully", "success");
};

const editHandler = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  taskInput.value = todo.task;
  dateInput.value = todo.date;
  addButton.style.display = "none";
  editButton.style.display = "inline-block";
  editButton.dataset.id = id;
};

const applyEditHandler = (event) => {
  const id = event.target.dataset.id;
  const todo = todos.find((todo) => (todo.id = id));
  todo.task = taskInput.value;
  todo.date = dateInput.value;
  taskInput.value = "";
  dateInput.value = "";
  addButton.style.display = "inline-block";
  editButton.style.display = "none";
  saveToLocalStorage();
  displayTodos();
  showAlert("Todo edited successfully", "success");
};

window.addEventListener("load", displayTodos());
addButton.addEventListener("click", addHandler);
deleteAllButton.addEventListener("click", deleteAllHandler);
editButton.addEventListener("click", applyEditHandler);
