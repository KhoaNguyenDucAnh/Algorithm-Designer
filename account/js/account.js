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
            a.innerText = element.name;
            a.href = "http://127.0.0.1:5500/design/" + element.id + ".html";
            li.appendChild(a);
            algorithm.appendChild(li);
        })
    });
}

document.addEventListener("DOMContentLoaded", function(){
    renderUsername();
    renderAlgorithm();
});

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
        a.innerText = data.name;
        a.href = "http://127.0.0.1:5500/design/" + data.id + ".html";
        li.appendChild(a);
        algorithm.appendChild(li);
    })
}