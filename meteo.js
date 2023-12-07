
const coordParis = ["48.8534100","2.3488000"];
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
}

async function getMeteo() {
    let coordonees = getCoordonees();
    try {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coordonees[0]}&longitude=${coordonees[1]}&current=temperature_2m,precipitation,cloud_cover&forecast_days=1`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod !== '404') {
            const temperature = `Temperature: ${data.current.temperature_2m} °C`;
            const precipitation = `Precipitation: ${data.current.precipitation} mm`;
            const cloudCover = `Cloud cover: : ${data.current.cloud_cover} %`;
            document.getElementById('weatherInfo').innerText = temperature +" | "+ precipitation +" | "+ cloudCover;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

//export {getMeteo};
