
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
    const response = await fetch(url, {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    console.log(response);

     window.location.href = "TaskWhiz.html";

  }

}
