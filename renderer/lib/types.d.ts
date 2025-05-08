declare global {
    interface Window {
        TeeAssembler: any;
    }

    var TeeAssembler: any;
}

export interface Config {
    API_URL: string;
}

export interface Country {
    identifier: string;
    code: string;
    iconUrl: string;
}

export interface Server {
    ip: string;
    port: number;
    name: string;
    map: string;
}

export interface Player {
    name: string;
    country: Country;
    clan: string;
    server: Server;
}

export interface ExtendedPlayer extends Player {
    skin: string;
    color?: string;
    foot_color?: string;
    status: string;
}

export interface LocalPlayerInfo {
    name: string;
    skin: string;
    color?: string;
    foot_color?: string;
    status: string;
}
export { Player, Config };
