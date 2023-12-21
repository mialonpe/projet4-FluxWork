async function getMeteo() {
    let coordoneesParis = ["48.8534100", "2.3488000"];
    try {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coordoneesParis[0]}&longitude=${coordoneesParis[1]}&current=temperature_2m,precipitation,cloud_cover,wind_speed_10m&forecast_days=1`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.cod !== '404') {
            return data;  
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

export default {getMeteo}