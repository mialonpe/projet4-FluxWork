
async function getMeteo() {
    let coordoneesParis = ["48.8534100", "2.3488000"];
    try {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coordoneesParis[0]}&longitude=${coordoneesParis[1]}&current=temperature_2m,precipitation,cloud_cover,wind_speed_10m&forecast_days=1`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod !== '404') {
            insertInfoMeteo(data);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function insertInfoMeteo(data) {
    const temperature = `${data.current.temperature_2m} °C`;
    const precipitation = `${data.current.precipitation} mm`;
    const cloudCover = `${data.current.cloud_cover} %`;
    const wind = `${data.current.wind_speed_10m} km/h`;
    console.log('Insert les donnees meteo')

    document.getElementById('temp-value').innerText = temperature;
    document.getElementById('rain-value').innerText = precipitation;
    document.getElementById('cloud-value').innerText = cloudCover;
    document.getElementById('wind-value').innerText = wind;

    getIcon(data);
}

function getIcon(data) {
    console.log('getIcon(data)');
    console.log(data);
    console.log(data.current.cloud_cover);
    icon = document.createElement('img');
    if (data.current.cloud_cover >= 80) {
        console.log("data.current.cloudCover > 80");
        if (data.current.precipitation > 0) {
            if (data.current.temperature_2m > 0) {
                icon.src = "./images/rain-cloud_icon-icons.com_54268.svg";
            } else {
                icon.src = "./images/weather-snow_snowing_icon-icons.com_67738.svg";
            }
        } else {
            icon.src = "./images/two-clouds-outlined-symbol-of-stroke-for-weather-interface_icon-icons.com_54632.svg";
        }
    } else if (10 < data.current.cloud_cover < 80) {
        console.log("10< data.current.cloudCover < 80")
        if (data.current.precipitation > 0) {
            icon.src = "images/sun-and-rain_icon-icons.com_54243.svg";
        } else {
            icon.src = "./images/sunandcloud_102742.svg";
        }
    } else {
        icon.src = "./images/sun-day-weather-symbol_icon-icons.com_73146.svg"
    }
    document.getElementById('meteo-img').appendChild(icon);
}

//export {getMeteo};
