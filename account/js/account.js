const url = "http://localhost:8080/api/v1/algorithms/";
const username = localStorage.getItem("username");
const userId = localStorage.getItem("userId");
const algorithm = document.getElementById("algorithm");

function renderUsername() {
    document.getElementById("username").innerText = "Hi " + username;
}

function renderAlgorithm() {
    fetch(url + "account/" + username, {
        method: "GET",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        algorithm.innerHTML = ""
        data.forEach(element => {
            let li = document.createElement("li");
            let a = document.createElement("a");
            let button = document.createElement("button");
            let block = document.createElement("div");
            block.className = "aProject";
            a.innerText = element.name;
            a.href = "http://localhost:8080/design/" + element.id + ".html";
            a.className = "project";
            button.className = "deleteButton";
            button.innerText = "Delete";
            button.addEventListener("click", function() {
                deleteAlgorithm(element.id)
            })
            block.appendChild(a);
            block.appendChild(button);
            li.appendChild(block);
            algorithm.appendChild(li);
        })
    });
}

function deleteAlgorithm(id){
    fetch(url + id, {
        method: "DELETE",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        renderAlgorithm();
    });
}

function addAlgorithm(){
    let name = document.querySelector("#projectName").value;
    fetch(url.slice(0, -1), {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            user: {
                id: userId,
                username: username
            }
        })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        renderAlgorithm();
    });
    let addbar = document.querySelector(".Projectname");
    let showBtn = document.querySelector(".CreateProject");
    addbar.style.display = "none";
    showBtn.style.display = "block";
    document.querySelector("#projectName").value= "";
}

document.addEventListener("DOMContentLoaded", function(){
    renderUsername();
    renderAlgorithm();
});

function Showbar(){
    let showBtn = document.querySelector(".CreateProject");
    let addbar = document.querySelector(".Projectname");
    addbar.style.display = "block";
    showBtn.style.display = "none";
}