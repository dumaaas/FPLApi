export function getLeague(id) {
    const url = `https://fantasy.premierleague.com/api/leagues-classic/${id}/standings`;
    return fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36' }
    })
}
