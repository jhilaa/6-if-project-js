let container = document.getElementById("sortable");
let taskModel = document.getElementsByClassName("list-item-model");
let inputTask = document.getElementById("inputTask");
let inputDescription = document.getElementById("inputDescription");

function addItem(task, description) {
  let newTask = taskModel[0].cloneNode(true);
  newTask.querySelector(".item-author").textContent = task;
  newTask.querySelector(".item-except").textContent = description;
  newTask.className = "list-item";
  newTask.style.display = "block";
  console.log(newTask.querySelector(".btnDeleteTask"));
  newTask.querySelector(".btnDeleteTask").addEventListener("click", (e) => {
    e.target.closest(".list-item").remove();
    storeDataTasks();
  });
  container.appendChild(newTask);
  //-----------
}

function storeDataTasks() {
  let taskElements = Array.from(document.getElementsByClassName("list-item"));
  console.log("0000000000");
  console.log(taskElements);
  tasks = taskElements.map((taskElement) => {
    let task = taskElement.getElementsByClassName("item-author")[0];
    let description = taskElement.getElementsByClassName("item-except")[0];
    return {
      "task": task.textContent,
      "description": description.textContent,
    };
  });
  chrome.storage.sync.set(
    {
      tasks,
    },
    () => {
      console.log("Recorded");
    }
  );
}

function getDataTasks() {
  chrome.storage.sync.get(["tasks"], function (data) {
    let dataTasks = data.tasks;
    dataTasks.map((task) => addItem(task["task"], task["description"]));
  });
}

//---------------------------
// init de la liste des tâches à partir de ce qu'il y  dans le storage
getDataTasks();

btnAddTask.addEventListener("click", () => {
  console.log("1");
  addItem(inputTask.value, inputDescription.value);
  storeDataTasks();
});
