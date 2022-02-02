let btnNewTask = document.getElementById("btnNewTask");

/*
chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});
*/

// When the button is clicked, inject setPageBackgroundColor into current page
btnNewTask.addEventListener("click", async () => {
  let itemsList = document.getElementsByClassName("list");
  let listItem = document.getElementsByClassName("list-item");
  let newTask = listItem[0].cloneNode(true);
  console.log(newTask.querySelector(".item-author"));
  newTask.querySelector(".item-author").innerHTML =
    document.getElementById("txtNewTask").value;
  newTask.querySelector(".item-except").innerHTML = document.getElementById(
    "txtNewTaskDescription"
  ).value;
  itemsList[0].appendChild(newTask);
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
