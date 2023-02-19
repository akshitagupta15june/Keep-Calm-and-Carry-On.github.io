
$(".btn").on("click", function() {
  if ($(".btn").html() === "Login") {
    $(".form-label").html("OTP");
    $(".btn").html("verify");
  }
  else {
    $(".form-label").html("Phone Number");
    $(".btn").html("Login");
  }
});


var phoneNo = "";
// getting phone
async function getPhoneAndOtp() {
  if ($(".btn").html() === "Login") {
    phoneNo = $("#myInput").val();

    var data = {
      phone: phoneNo,
    }
    var url = "https://workathon.harrykanani.repl.co/api/auth/sendotp";
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    console.log(response);

  }
  else {
    var otp = $("#myInput").val();
    console.log(phoneNo, otp);
    var data = {
      phone: phoneNo,
      code: otp
    }
    var url = "https://workathon.harrykanani.repl.co/api/auth/verifyotp";
    let response = await fetch(url, {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    if (response.status == 200) {
      response = await response.json();
      console.log(response);
      debugger;
      localStorage.setItem("id", response._id);
      window.location.href = "TaskWhiz.html";
    } else {
      alert("You're not registered. Please register first.");
    }


  }

}
