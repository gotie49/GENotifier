interface Player {
    name: string,
    country: {identifier: string, code: number, iconUrl: string},
    clan: string,
    server: {ip: string, port: number, name: string, map: string}
}

interface Config {
    API_URL: string,
    PLAYER: string[],
    CLAN: string[],
}

export {Player, Config};