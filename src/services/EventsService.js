export async function getEvents() {
    let events = '';
    await fetch('https://catfact.ninja/fact')
        .then(res => res.json())
        .then(json => {
            console.log('JSON ', json.fact);
            events = json.fact
        }).catch(error => {
        console.log('ERROR > ', error);
    });
    return events;
}
