//         getting user_id

const user_id = localStorage.getItem("id");


var arr = [];
async function getTasks() {
  var data = {
    user_id
  }
  var url = "https://workathon.harrykanani.repl.co/api/tasks/getTask";
  var response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  response = await response.json();
  console.log(response);

  arr = response;
}

async function addTasks(inputVal) {
  var data = {
    user_id,
    title: inputVal.name
  }
  var url = "https://workathon.harrykanani.repl.co/api/tasks/addTask";
  var response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  response = await response.json();
  console.log(response);
  arr = response;
  display();

}




//getting task
function getInputValue() {
  var inputVal = $("#myInput").val();
  // alert(inputVal);
  var task = {
    id: arr.length + 1 + "",
    name: inputVal + ""
  }
  addTasks(task);
  display();
}

// rendering tasks
function display() {
  $("#myList").empty();
  let list = document.getElementById("myList");

  arr.forEach((item) => {
    let li = document.createElement("div");
    li.innerText = "⚫         " + item.title;
    li.className = "checkdiv"
    li.id = item._id;


    // var checkbox = document.createElement("input");
    // checkbox.type = "checkbox";
    // checkbox.id = item._id + "";
    // checkbox.className = "notChecked";

    var checkbox = document.createElement("button");
    checkbox.type = "button";
    checkbox.value = "true";
    checkbox.id = item._id + "";
    checkbox.className = "notChecked";


    li.appendChild(checkbox);

    list.appendChild(li);
  })
}

// adding eventlistner for checked

$("body").on('click', '.checked', function() {
  var publisherId = $(this).attr('id');
  alert('PublisherId : ' + publisherId);
});
