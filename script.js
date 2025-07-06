let tasks = [];

function showSection(section) {
  document.getElementById('addSection').style.display = section === 'add' ? 'block' : 'none';
  document.getElementById('viewSection').style.display = section === 'view' ? 'block' : 'none';
  if (section === 'view') renderTasks('all');
}

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  const message = document.getElementById('addMessage');

  if (text === "") {
    message.textContent = "Please enter a task.";
    return;
  }

  tasks.push({ text, completed: false });
  input.value = "";
  message.textContent = "Task added successfully!";
}

function renderTasks(filter = 'all') {
  const list = document.getElementById('taskList');
  list.innerHTML = "";

  const filteredTasks = tasks.filter(task =>
    filter === 'all' ? true : filter === 'completed' ? task.completed : !task.completed
  );

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    const actions = document.createElement("div");
    actions.className = "actions";

    if (!task.completed) {
      const completeBtn = document.createElement("button");
      completeBtn.textContent = "Complete";
      completeBtn.onclick = () => markTaskComplete(index);
      actions.appendChild(completeBtn);
    }

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editTask(index);
    actions.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTask(index);
    actions.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(actions);
    list.appendChild(li);
  });

  updateProgress();
}

function markTaskComplete(index) {
  tasks[index].completed = true;
  renderTasks('all');
}

function editTask(index) {
  const newTask = prompt("Edit the task:", tasks[index].text);
  if (newTask !== null && newTask.trim() !== "") {
    tasks[index].text = newTask.trim();
    renderTasks('all');
  }
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    renderTasks('all');
  }
}

function updateProgress() {
  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  document.getElementById('progress').textContent =
    `Progress: ${completed} / ${total} tasks completed`;
}
