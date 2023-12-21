function getResponseDisrupt() {
    return fetch("http://localhost:8282/perturbations", {

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
            return json
        });
}

function showDisruption() {
    getResponseDisrupt()
    .then(data => { if (data.length > 0) {
        for (disrupt of data) {
            if (disrupt.status = "active") {
                if (disrupt.messages[0].text != "Panne d'un ascenseur") {
                    if (disrupt.messages[0].channel.content_type == "text/plain") {
                        getDisruptMsg(disrupt.messages)
                    } else if (disrupt.messages[0].channel.content_type == "text/html") {
                        getAlertMsg(disrupt.messages);
                    }
                }
            }
        }
    }})
    .catch(error => console.error('Error fetching meteo data:', error))
}

function getDisruptMsg(messages) {
    msg = document.createElement("div");
    msg.classList.add("card", "m-2", "p-3");
    msg.style.cursor = "pointer";
    msg.innerText = messages[0].text;

    document.getElementById('disruptions').appendChild(msg);
    for (m of messages) {
        if (m.channel.content_type == "text/html") {
            msgPlus = document.createElement("div");
            msgPlus.style.display = 'none';
            msgPlus.id = messages[0].text;
            msgPlus.innerHTML = m.text;
            document.getElementById('disruptions').appendChild(msgPlus);
        }
    }
    msg.onclick = function () {
        showMsgPlus(messages[0].text);
    };
}

function getAlertMsg(message) {
    msg = document.createElement("div");
    msg.classList.add("card", "m-2", "p-3");
    msg.innerHTML = message[0].text;
    document.getElementById('alerts').appendChild(msg);
}

function showMsgPlus(id) {
    let msgPlus = document.getElementById(id);
    console.log(msgPlus);
    msgPlus.style.display = 'block';
}

function getTabs(id) {
    let allTabs = document.getElementsByClassName('nav-link');
    for (let i = 0; i < allTabs.length; i++) {
        allTabs[i].classList.remove('active');
    }
    let clickedTab = document.getElementById(id);
    clickedTab.classList.add('active');

    let disrupts = document.getElementById("disruptions");
    let alerts = document.getElementById("alerts");
    if (id == "tab-disruptions") {
        disrupts.style.display = 'block';
        alerts.style.display = 'none';
    } else if (id == "tab-alerts") {
        disrupts.style.display = 'none';
        alerts.style.display = 'block';
    }
}

