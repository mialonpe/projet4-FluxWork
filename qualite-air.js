
/*const coordParis = ["48.8534100","2.3488000"];
const coordLondres = ["48.862725","2.287592"];
const coordMadrid = ["40.4167047","-3.7035825"];
const coordBerlin = ["52.5170365","13.3888599"];
const coordRome = ["41.8933203","12.4829321"];

function getCoordonees() {
    var ville = document.getElementById('villes').value;
    if (ville == "Paris") {
        return coordParis;
    } else if (ville == "Londres") {
        return coordLondres;
    } else if (ville == "Madrid") {
        return coordMadrid;
    } else if (ville == "Berlin") {
        return coordBerlin;
    } else if (ville == "Rome") {
        return coordRome;
    }
}*/

async function getQualite() {
    let coordonees = getCoordonees();
    try {
        const apiUrl = `http://api.airvisual.com/v2/city?city=Paris&state=Ile-de-France&country=France&key=999de611-bfb1-41a6-8816-a04ace2a6134`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod !== '404') {
            const qualite = `Qualite de l'air: ${data.data.current.pollution.aqius} (US index)`;
            console.log(qualite);
            document.getElementById('qualiteAir').innerText = qualite;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

//export {getMeteo};
