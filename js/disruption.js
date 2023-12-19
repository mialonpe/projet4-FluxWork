
function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate)
    return formattedDate;
}

key = "5lc2JZu9yw1iiAYhGaPEeuKyQGurivAS"
let headers = new Headers();
headers = { 'Accept': 'application/json', 'apikey': key };

async function getDisruption() {
    let date = getFormattedDate();
    try {
        const apiUrl = `https://prim.iledefrance-mobilites.fr/marketplace/navitia/coverage/fr-idf/disruptions?since=${date}`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: headers
        });
        const data = await response.json();
        if (data.disruptions.length > 0) {
            const disrupts = data.disruptions;
            for (disrupt of disrupts) {
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
        }
    } catch (error) {
        console.error('Error fetching disruptions data:', error);
    }
}

function getDisruptMsg(messages) {
    msg = document.createElement("div");
    msg.classList.add("card", "m-2", "p-3");
    msg.innerText = messages[0].text;
    console.log('getDisruptMsg')
    
    document.getElementById('disruptions').appendChild(msg);
    for (m of messages) {
        if (m.channel.content_type == "text/html") {
            msgPlus = document.createElement("div");
            msgPlus.style.display ='none';
            msgPlus.id = messages[0].text;
            msgPlus.innerHTML = m.text;
            document.getElementById('disruptions').appendChild(msgPlus);
        }
    }
    msg.onclick = function() {
        showMsgPlus(messages[0].text);
    };
}

function getAlertMsg(message) {
    console.log('getAlertMsg')
    msg = document.createElement("div");
    msg.classList.add("card", "m-2", "p-3");
    msg.innerHTML = message[0].text;
    document.getElementById('alerts').appendChild(msg);
}

function showMsgPlus(id) {
    console.log('showMsgPlus : '+id);
    let msgPlus = document.getElementById(id);
    console.log(msgPlus);
    msgPlus.style.display = 'block';
}

function getTabs(id){
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
    } else if (id == "tab-alerts"){
        disrupts.style.display = 'none';
        alerts.style.display = 'block';
    }
    
}

