function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate)
    return formattedDate;
}

async function getChantiers() {
    let date = getFormattedDate();
    try {
        const apiUrl = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/chantiers-perturbants/records?limit=99`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            //headers: headers
        });
        const data = await response.json();
        if (data.results.length > 0) {
            const results = data.results;
            for (result of results) {
                if (result.date_fin >= date) {
                    console.log(result);
                    getChantierMsg(result)
                }
            }
        }
    } catch (error) {
        console.error('Error fetching disruptions data:', error);
    }
}

function getChantierMsg(result) {
    transport = document.getElementById("transport");

    let card = document.createElement("div");
    card.classList.add("card", "m-2", "p-3");
    transport.appendChild(card);

    let voieMsg = document.createElement("div");
    voieMsg.innerText = result.voie;
    voieMsg.style.fontWeight ='bold';
    card.appendChild(voieMsg);

    let localMsg = document.createElement("div");
    localMsg.innerText = result.precision_localisation;
    card.appendChild(localMsg);
}
