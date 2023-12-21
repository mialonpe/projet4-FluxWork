function getResponseTransport() {
    return fetch("http://localhost:8282/transport", {

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
            return json;
        });
}

function showTransport() {
    getResponseTransport()
        .then(data => {
            if (data.length > 0) {
                for (result of data) {
                    if (result.date_fin >= getFormattedDate()) {
                        getChantierMsg(result)
                    }
                }
            }
        })
        .catch(error => console.error('Error fetching transport data:', error));
}

function getChantierMsg(result) {
    transport = document.getElementById("transport");

    let card = document.createElement("div");
    card.classList.add("card", "m-2", "p-3");
    transport.appendChild(card);

    let voieMsg = document.createElement("div");
    voieMsg.innerText = result.voie;
    voieMsg.style.fontWeight = 'bold';
    card.appendChild(voieMsg);

    let localMsg = document.createElement("div");
    localMsg.innerText = result.precision_localisation;
    card.appendChild(localMsg);
}

function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate)
    return formattedDate;
}