import { BrowserWindow, Notification as ElectronNotification } from 'electron';
import { ExtendedPlayer } from '../renderer/lib/types';
import path from 'path';

export default function createPlayerNotification(
    mainWindow: BrowserWindow | null,
    player: ExtendedPlayer
) {
    const mapKey = Object.keys(player.server.map)[0];
    const mapName = player.server.map[mapKey];

    const notification = new ElectronNotification({
        toastXml: `<toast>
      <visual>
      <binding template="ToastText02">
      <text id="1">${player.name} is playing!</text>
      <text id="2">${mapName} on ${player.server.name}</text>
      </binding>
      </visual>
      <actions>
      <action content="Join" activationType="protocol" arguments="gen://join" />
      </actions>
      </toast>`,
    });
    notification.show();
    return notification;
}
