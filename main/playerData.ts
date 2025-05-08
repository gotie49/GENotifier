import { Config, ExtendedPlayer, LocalPlayerInfo } from '../types';

async function fetchPlayerData(): Promise<ExtendedPlayer[]> {
    try {
        const config: Config = await import('../data/config.json')
            .then((module) => module.default)
            .catch((error) => {
                console.error('Error loading config file:', error);
                throw new Error('Failed to load configuration file');
            });

        const localPlayers: LocalPlayerInfo[] = await import(
            '../data/players.json'
        )
            .then((module) => module.default.players)
            .catch((error) => {
                console.error('Error loading players file:', error);
                throw new Error('Failed to load players configuration file');
            });

        if (!config.API_URL) {
            throw new Error('Invalid configuration: API_URL missing');
        }

        const enrichedPlayers = await Promise.all(
            localPlayers.map(async (localPlayer): Promise<ExtendedPlayer> => {
                try {
                    const response = await fetch(
                        `${config.API_URL}player/name/${encodeURIComponent(
                            localPlayer.name
                        )}`
                    );

                    if (!response.ok) {
                        console.warn(
                            `Failed to fetch data for player ${localPlayer.name}: ${response.statusText}`
                        );
                        throw new Error('API fetch failed');
                    }

                    const data = await response.json();
                    const apiPlayer = data.players?.[0];

                    if (!apiPlayer) {
                        throw new Error('API player not found');
                    }

                    return {
                        name: apiPlayer.name,
                        country: {
                            identifier: apiPlayer.country.identifier,
                            code: apiPlayer.country.code,
                            iconUrl: apiPlayer.country.iconUrl,
                        },
                        clan: apiPlayer.clan?.name || '',
                        server: {
                            ip: apiPlayer.server.ip,
                            port: apiPlayer.server.port,
                            name: apiPlayer.server.name,
                            map: apiPlayer.server.map,
                        },
                        skin: localPlayer.skin,
                        color: localPlayer.color,
                        foot_color: localPlayer.foot_color,
                        status: 'online',
                    };
                } catch (error) {
                    console.warn(
                        `Using local-only data for ${localPlayer.name}:`,
                        error
                    );
                    return {
                        name: localPlayer.name,
                        country: {
                            identifier: '',
                            code: '',
                            iconUrl: '',
                        },
                        clan: '',
                        server: {
                            ip: '',
                            port: 0,
                            name: '',
                            map: '',
                        },
                        skin: localPlayer.skin,
                        color: localPlayer.color,
                        foot_color: localPlayer.foot_color,
                        status: localPlayer.status,
                    };
                }
            })
        );

        return enrichedPlayers;
    } catch (error) {
        console.error('Error in fetchPlayerData:', error);
        throw error;
    }
}
export { fetchPlayerData };
