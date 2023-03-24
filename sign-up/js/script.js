const handleLogin = (event) => {
  console.log(event);
};

let form = document.querySelector(".form");

form.addEventListener("submit", e => {
  console.log(document.getElementsByName("email"));
  e.preventDefault();
});