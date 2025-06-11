document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => {
      addTask(taskText, false);
    });
  }

  function addTask(taskTextParam, save = true) {
    const taskText = (taskTextParam ?? taskInput.value).trim();
    if (taskText === "") {
      alert("Enter a task");
      return;
    }

    // Check for duplicates if saving
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      if (storedTasks.includes(taskText)) {
        alert("Task already exists!");
        return;
      }
    }

    // Create and append task
    const li = document.createElement("li");
    li.textContent = taskText;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");

    li.appendChild(removeBtn);
    taskList.appendChild(li);
    taskInput.value = "";

    // Remove task
    removeBtn.addEventListener("click", function () {
      taskList.removeChild(li);
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const updatedTasks = storedTasks.filter((task) => task !== taskText);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    });

    // Save to storage (if not loading)
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }
  }

  addButton.addEventListener("click", () => addTask());
  taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask();
    }
  });
  loadTasks();
});
