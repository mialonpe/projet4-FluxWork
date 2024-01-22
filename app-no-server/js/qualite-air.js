
async function getQualite() {
    try {
        const apiUrl = `https://api.airvisual.com/v2/city?city=Paris&state=Ile-de-France&country=France&key=999de611-bfb1-41a6-8816-a04ace2a6134`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod !== '404') {
            const qualite = data.data.current.pollution.aqius;
            insertInfo(qualite);
            
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function insertInfo(qualite) {
    console.log('qualite : ' + qualite);
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



//export {getMeteo};
