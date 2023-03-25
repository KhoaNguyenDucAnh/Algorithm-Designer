const url = "http://localhost:8080/api/v1/accounts/";
var form = document.querySelector(".form");

function handleLogin(event) {
  event.preventDefault();
  const data = {
    username: form.email.value,
    password: form.password.value
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(function(response) {
    if (!response.ok) {
      alert("Invalid Credentials");
      throw new Error("Invalid Credentials");
    }
    return response.json();
  })
  .then(function(data) {
      console.log(data);
      sessionStorage.setItem("username", data.username);
      window.location.href = "account.html";
  });
}

form.addEventListener("submit", handleLogin);