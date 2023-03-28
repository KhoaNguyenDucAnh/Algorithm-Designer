const url = "http://localhost:8080/api/v1/algorithms/";
const username = sessionStorage.getItem("username");
const usernameId = sessionStorage.getItem("usernameId");
const algorithm = document.getElementById("algorithm");

function renderUsername() {
    document.getElementById("username").innerText = "Account: " + username;
}

function renderAlgorithm() {
    fetch(url + "account/" + username, {
        method: "GET",
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
            a.innerText = element.name;
            a.href = url + element.id; 
            button.className = "deleteButton";
            button.innerText = "Delete me";
            button.addEventListener("click", function() {
                deleteAlgorithm(element.id)
            })
            li.appendChild(a);
            li.appendChild(button);
            algorithm.appendChild(li);
        })
    });
}

function deleteAlgorithm(id){
    fetch(url + id, {
        method: "DELETE",
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
        body: JSON.stringify({
            name: name,
            account: {
                id: usernameId,
            }

        }),
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

document.addEventListener("DOMContentLoaded", function(){
    renderUsername();
    renderAlgorithm();
});