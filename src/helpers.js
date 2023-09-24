let tasks = [];

const taskForm = document.querySelector("#task-form");
const taskNameInput = document.querySelector("#task-name");
const taskDescriptionInput = document.querySelector("#task-description");
const taskList = document.querySelector("#task-list");

async function addTask(event) {
  event.preventDefault();

  const taskName = taskNameInput.value.trim();
  const taskDescription = taskDescriptionInput.value.trim();

  const dogImage = await getDogImage();

  if (taskName === "") {
    return;
  }

  const task = {
    id: Date.now(),
    name: taskName,
    description: taskDescription,
    status: "Pending",
    image: dogImage
  };

  tasks.push(task);
  displayTasks();
  taskForm.reset();
}

function displayTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <div class="card w-96 bg-neutral text-neutral-content my-4">
      <div class="card-body items-center text-center">
        <img src="${task.image}" alt="dog image">
        <h2 class="card-title">${task.name}</h2>
        <p>${task.description}</p>
        <p>Status: ${task.status}</p>
        <div class="card-actions justify-end">
          <button onclick="editTask(${task.id})" class="btn btn-info">Edit</button>
          <button onclick="deleteTask(${task.id})" class="btn btn-error">Delete</button>
        </div>
      </img>
    </div>
  `;
    taskList.appendChild(li);
  });
}

function editTask(taskId) {
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return;
  }

  const newName = prompt("Edit name:", task.name);
  const newDescription = prompt("Edit description:", task.description);

  if (newName !== null) {
    task.name = newName;
  }
  if (newDescription !== null) {
    task.description = newDescription;
  }
  displayTasks();
}

function deleteTask(taskId) {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    displayTasks();
  }
}

async function getDogImage() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');

    const data = await response.json();
    const imageUrl = data.message;
    
    return imageUrl;
}

taskForm.addEventListener("submit", addTask);

displayTasks();


