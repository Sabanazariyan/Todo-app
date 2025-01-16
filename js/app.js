const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");

const todos = [];

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
  }else{
    alert("warnning")
  }
};

addButton.addEventListener("click", addHandler);
