const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const alertMessage = document.getElementById("alert-message");

const todos = [];

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
  } , 2000);
};

const addHandler = () => {
  const task = taskInput.value;
  const date = dateInput.value;
  //دومی ها مقادیری هستند که کاربر وارد کرده و ما دریافت کردیم
  const todo = {
    task: task,
    date: date,
    completed: false,
  };
  //حتما متن تودو باید وارد شود ولی تاریخ میتواند خالی باشد
  if (task) {
    // بعد اضافه کردن تودو به لیست تودوز مقادیر اینپوت را خالی کن
    todos.push(todo);
    taskInput.value = "";
    dateInput.value = "";
    console.log(todos);
    showAlert("Todo added successfully", "success");
  } else {
    //استفاده از تایع بالا و وارد کردن مقادیر ورودی و تایپ پیام
    showAlert("please enter a todo !", "error");
  }
};

addButton.addEventListener("click", addHandler);
