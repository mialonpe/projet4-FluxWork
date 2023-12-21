function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate)
    return formattedDate;
}

function getHeaders() {
    const key = "5lc2JZu9yw1iiAYhGaPEeuKyQGurivAS";
    let headers = new Headers();
    headers = { 'Accept': 'application/json', 'apikey': key };
    return headers;
}

async function getDisruption() {
    let date = getFormattedDate();
    try {
        const apiUrl = `https://prim.iledefrance-mobilites.fr/marketplace/navitia/coverage/fr-idf/disruptions?since=${date}`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: getHeaders()
        });
        const data = await response.json();
        if (data.disruptions.length > 0) {
            const disrupts = data.disruptions;
            return disrupts;
        }
    } catch (error) {
        console.error('Error fetching disruptions data:', error);
    }
}

export default { getDisruption };