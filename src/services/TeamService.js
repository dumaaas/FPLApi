export function getManagerTeam(manager_id, event_id) {
    const url = `https://fantasy.premierleague.com/api/entry/${manager_id}/event/${event_id}/picks/`;
    return fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36' }
    })
}

export function getBootstrapStatic() {
    const url = 'https://fantasy.premierleague.com/api/bootstrap-static/';
    return fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36' }
    })
}

export function getLivePlayerData(event_id) {
    const url = `https://fantasy.premierleague.com/api/event/${event_id}/live/`;
    return fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36' }
    })
}

