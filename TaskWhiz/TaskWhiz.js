
var arr = [];

//getting task
function getInputValue(){
           var inputVal = $("#myInput").val();
           // alert(inputVal);
           var task = {
             id: arr.length + 1 + "",
             name: inputVal + ""
           }
           arr.push(task);
           display();
       }

// rendering tasks
function display(){
  $("#myList").empty();
  let list = document.getElementById("myList");

  arr.forEach((item)=>{
  let li = document.createElement("li");
  li.innerText = item.name;
  list.appendChild(li);
})
}
