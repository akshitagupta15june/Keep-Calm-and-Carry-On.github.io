// getting phone
async function getRegistered(){
            var namePerson = $("#name").val();
            alert(namePerson);
            var phoneNo = $("#phone").val();
            alert(phoneNo);
            var mail = $("#email").val();
            alert(mail);
            
            var data = {
              username: namePerson,
              phone: phoneNo,
              email: mail
    }
  console.log(data)
    var url = "https://workathon.harrykanani.repl.co/api/auth/register";
    let response = await fetch(url, {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    console.log(response.status, typeof response.status);
    debugger;
    if(response.status == 200) {
      response = await response.json();
    console.log(response)

      
      var user_id = response._id;
      localStorage.setItem("id", response._id);
      window.location.href = "loginPhone.html";
    }

  
}
