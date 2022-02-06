let sortable = document.getElementById("sortable");
let taskModel = document.getElementsByClassName("list-item-model");
let inputTask = document.getElementById("inputTask");
let inputDescription = document.getElementById("inputDescription");

function addItem(task, description) {
  let newTask = taskModel[0].cloneNode(true);
  newTask.querySelector(".item-task").value = task;
  newTask.querySelector(".item-detail").value = description;
  newTask.classList.add("list-item");
  newTask.classList.add("list-item-model");
  newTask.style.display = "flex";
  //----------------
  newTask.querySelector(".btnDeleteTask").addEventListener("click", (e) => {
    e.target.closest(".list-item").remove();
    storeDataTasks();
  });
  //----------------
  newTask.querySelector(".btnCheck").addEventListener("click", (e) => {
    let cardRoot = e.target.closest(".card");
    let btnCheck = cardRoot.querySelector(".btnCheck");
    btnCheck.classList.add("d-none");
    storeDataTasks();
  });
  //-----------------
  newTask.querySelector(".item-task").addEventListener("input", (e) => {
    let cardRoot = e.target.closest(".card");
    let btnCheck = cardRoot.querySelector(".btnCheck");
    btnCheck.classList.remove("d-none");
  });
  //-----------------
  newTask.querySelector(".item-detail").addEventListener("input", (e) => {
    let cardRoot = e.target.closest(".card");
    let btnCheck = cardRoot.querySelector(".btnCheck");
    btnCheck.classList.remove("d-none");
  }),
    //------------------
    sortable.appendChild(newTask);
  if (newTask.querySelector(".item-task") == "") {
    newTask.querySelector(".item-task").focus();
  }
}

function hideAllEditButtons() {
  let allEditButtons = document.getElementsByClassName("btnEditTask");
  Array.from(allEditButtons).forEach((btn) => {
    btn.classList.add("d-none");
  });
}

function storeDataTasks() {
  // hideAllEditButtons();
  let taskElements = Array.from(document.getElementsByClassName("list-item"));
  tasks = taskElements.map((taskElement) => {
    let task = taskElement.getElementsByClassName("item-task")[0];
    let description = taskElement.getElementsByClassName("item-detail")[0];
    return {
      "task": task.value,
      "description": description.value,
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
  addItem("", "");
  storeDataTasks();
});
