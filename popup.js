let container = document.getElementById("sortable");
let btnAddTask = document.getElementById("btnAddTask");
let taskModel = document.getElementById("taskModel");
let inputTask = document.getElementById("inputTask");
let inputDescription = document.getElementById("inputDescription");

function addItem(task, description) {
  let newTask = taskModel.cloneNode(true);
  newTask.querySelector(".item-author").textContent = task;
  newTask.querySelector(".item-except").textContent = description;
  container.appendChild(newTask);
}

function setDataTasks() {
  let taskElements = Array.from(document.getElementsByClassName("flex"));
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
    function () {
      console.log("Recorded");
    }
  );
}

function getDataTasks() {
  let key = "tasks";
  chrome.storage.sync.get([key], function (data) {
    let dataTasks = data.tasks;
    dataTasks.map((task) => addItem(task["task"], task["description"]));
  });
}

btnAddTask.addEventListener("click", () => {
  // ajout d'un item dans la liste en clonant un item existant
  // et on change ses valeurs selon celles des inputs
  addItem(inputTask.value, inputDescription.value);
  setDataTasks();
  //getDataTasks();
});

// init de la liste des tâches à partir de ce qu'il y  dans le storage
getDataTasks();
