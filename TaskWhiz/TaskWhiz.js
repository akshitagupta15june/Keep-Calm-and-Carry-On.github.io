//         getting user_id

const user_id = localStorage.getItem("id");


var arr = [];

//             onload display
async function myFunction() {
  await getTasks();
  display();
}

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
  return;
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


    var button = document.createElement("button");
    button.type = "button";
    button.value = "false";
    button.id = item._id + "-chk";
    button.className = "notChecked";
    button.innerText = "✔️";

    var deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.value = "false";
    deleteButton.id = item._id + "-btn";
    deleteButton.className = "delete";
    deleteButton.innerText = "🪚";


    li.appendChild(button);
    li.appendChild(deleteButton);

    list.appendChild(li);

    // adding eventlistner for checked

    $("#" + item._id + "-chk").on("click", function() {
      var id = $(this).attr("id").split("-")[0];
      $("#" + id).toggleClass("checked");

      if ($("#" + item._id + "-chk").attr("value") === "false") {
        $("#" + item._id + "-chk").attr("value", "true");
        markAsComplete(id, true);
      }
      else {
        $("#" + item._id + "-chk").attr("value", "false");
        markAsComplete(id, false);
      }

    });

    // getting delete instruction

    $("#" + item._id + "-btn").on("click", function() {
      var id = $(this).attr("id").split("-")[0];
      deleteTask(id);
      alert("Deleted Successfully");
    });
  })
}

//            mark as complete

async function markAsComplete(id, value) {
  var data = {
    task_id: id,
    is_completed: value
  }
  var url = "https://workathon.harrykanani.repl.co/api/tasks/markComplete";
  var response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  response = await response.json();
  console.log(response);

}

//                       delete task

async function deleteTask(id) {
  var data = {
    task_id: id,
  }
  var url = "https://workathon.harrykanani.repl.co/api/tasks/deleteTask";
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
