const url = "https://1f9dd58e-88c5-46df-854d-280aa21a799b.mock.pstmn.io/api/v1/algorithms/";
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
            a.href = "http://127.0.0.1:5500/design/" + element.id + ".html";
            button.innerText = "Delete me";
            button.onclick = deleteAlgorithm;
            button.className = "deleteButton";
            li.appendChild(a);
            li.appendChild(button);
            algorithm.appendChild(li);
        })
    });
}

document.addEventListener("DOMContentLoaded", function(){
    renderUsername();
    renderAlgorithm();
});

function deleteAlgorithm(){
    let Algoid = 2;
    fetch(url+'/'+Algoid, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        renderAlgorithm();  
    })
}

function addAlgorithm(){
    var name = document.querySelector("#projectName").value;
    fetch(url, {
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
        let li = document.createElement("li");
        let a = document.createElement("a");
        let button = document.createElement("button");
        a.innerText = data.name;
        button.innerText = "Delete me";
        button.onclick = deleteAlgorithm;
        button.className = "deleteButton";
        a.href = "http://127.0.0.1:5500/design/" + data.id + ".html";
        li.appendChild(a);
        li.appendChild(button);
        algorithm.appendChild(li);
    })
}