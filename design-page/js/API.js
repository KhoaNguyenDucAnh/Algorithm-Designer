const url = "http://localhost:8080/api/v1/algorithms/";
const algorithmId = window.location.pathname.slice(8, -5);

function updateAlgorithm() {
    fetch(url + algorithmId, {
        method: "PUT",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "blockBar": document.getElementsByClassName("block-bar")[0].innerHTML,
            "chartSection": document.getElementsByClassName("chart-section")[0].innerHTML
        })
    })
    .then(function(response) {
        if (!response.ok) {
            alert("Error with saving file");
            throw new Error("Error with saving file");
        }
        return response.json();
    })
    .then(function(data) {
        return;
    });
}