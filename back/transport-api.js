async function getChantiers() {
    try {
        const apiUrl = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/chantiers-perturbants/records?limit=99`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.cod !== '404') {
           return data.results;
        }
    } catch (error) {
        console.error('Error fetching disruptions data:', error);
    }
}

export default {getChantiers};