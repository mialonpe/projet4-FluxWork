
async function getQualite() {
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
