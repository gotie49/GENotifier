import { Player,Config } from "../types/types";

async function fetchPlayerData(): Promise<Player[]> {
    try {
      const config: Config = await import('../../config.json')
        .then(module => module.default)
        .catch(error => {
          console.error('Error loading config file:', error);
          throw new Error('Failed to load configuration file');
        });
      
      if (!config.API_URL|| !config.PLAYER|| !Array.isArray(config.PLAYER)) {
        throw new Error('Invalid configuration: api_url or players array missing');
      }
      
      const players: Player[] = [];
      
      for (const playerName of config.PLAYER) {
        try {
          const response = await fetch(`${config.API_URL}player/name/${encodeURIComponent(playerName)}`);
          
          if (!response.ok) {
            console.warn(`Failed to fetch data for player ${playerName}: ${response.statusText}`);
            continue; 
          }
        
          const data = await response.json();

          const rawPlayer = data.players?.[0];
          if (!rawPlayer) {
            console.warn(`No player data found for ${playerName}`);
            continue;
          }

          const player: Player = {
            name: rawPlayer.name,
            country: {
              identifier: rawPlayer.country.identifier,
              code: rawPlayer.country.code,
              iconUrl: rawPlayer.country.iconUrl,
            },
            clan: rawPlayer.clan?.name ?? '',  
            server: {
              ip: rawPlayer.server.ip,
              port: rawPlayer.server.port,
              name: rawPlayer.server.name,
              map: rawPlayer.server.map,  
            },
          };

          players.push(player);

        } catch (playerError) {
          console.warn(`Error processing player ${playerName}:`, playerError);
        }
      }
      
      return players;
    } catch (error) {
      console.error('Error in fetchPlayerData:', error);
      throw error;
    }
  }

  export {fetchPlayerData};
  