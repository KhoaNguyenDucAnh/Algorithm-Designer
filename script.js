const url = "https://1f9dd58e-88c5-46df-854d-280aa21a799b.mock.pstmn.io/api/v1/accounts/login";
var form = document.querySelector(".form");

function handleLogin(event) {
  event.preventDefault();
  const email = form.email.value;
  const password = form.password.value;
  const data = {
    username: form.email.value,
    password: form.password.value
  };
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(Respone => Respone.json())
  .then(data => console.log(data.username));
  // if(false){
  //   window.location.href = "personal.html";
  // }
  // else{
  //   alert("Invalid Credentials");
  // }
}


form.addEventListener("submit", handleLogin);