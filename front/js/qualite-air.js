function getResponseQualite() {
    return fetch("http://localhost:8282/qualite-air", {

        // Adding method type
        method: "GET",

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        // Converting to JSON
        .then(response => response.json())
        // Displaying results to console
        .then(json => {
            console.log(json);
            return json
        });
}

function showQualite(){
    getResponseQualite()
    .then(data => insertInfoQualite(data))
    .catch(error => console.error('Error fetching qualite-air data:', error));
}

function insertInfoQualite(data) {
    let qualite = data.aqius;
    let airValue = document.getElementById('air-value');
    if (qualite < 50) {
        airValue.innerText = 'Bonne';
        airValue.style.color = 'green';
    } else if (qualite >= 50 && qualite < 100) {
        airValue.innerText = 'Modérée';
        airValue.style.color = 'orange';
    } else if (qualite >= 100 && qualite < 150) {
        airValue.innerText = 'Mauvaise';
        airValue.style.color = 'red';
    } else {
        airValue.innerText = 'Dangereuse';
        airValue.style.color = 'purple';
    }
}