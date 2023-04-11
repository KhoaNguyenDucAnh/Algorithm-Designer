const url = "http://localhost:8080/api/v1/algorithms/";
const algorithmId = window.location.pathname.slice(8, -5);

function updateAlgorithm() {
    fetch(url + "update/" + algorithmId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "document": document.documentElement.outerHTML
        })
    })
    .then(function(response) {
        if (!response.ok) {
            alert("Error with saving file");
            throw new Error("Error with saving file");
        };
    })
}