import path from 'path';
import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import { diffPlayers, fetchPlayerData } from './playerData';
import { createTray } from './tray';
import { ExtendedPlayer } from '../renderer/lib/types';
import createPlayerNotification from './notification';

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
    serve({ directory: 'app' });
} else {
    app.setPath('userData', `${app.getPath('userData')} (development)`);
}

let mainWindow;
(async () => {
    await app.whenReady();
    //app.setAsDefaultProtocolClient('gen');
    app.setAppUserModelId('GENotifier');
    mainWindow = createWindow('main', {
        width: 1000,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        frame: false,
        icon: path.join(__dirname, '..', 'resources', 'genIcon.ico'),
    });

    if (isProd) {
        await mainWindow.loadURL('app://./home');
    } else {
        const port = process.argv[2];
        await mainWindow.loadURL(`http://localhost:${port}/home`);
        mainWindow.webContents.openDevTools();
    }

    createTray(mainWindow);
})();

app.on('open-url', (_event, url) => {
    if (!mainWindow || mainWindow.isDestroyed()) {
        return;
    }
    const [protocol, path] = url.split(':');
    const command = path.replace(/\//gi, '');
    if (command === 'join') {
        console.log('join!');
    }
});

let oldPlayers: ExtendedPlayer[] = [];
ipcMain.on('fetch-players', async (event) => {
    try {
        const players = await fetchPlayerData();
        const diffData = diffPlayers(oldPlayers, players);
        oldPlayers = players;
        event.reply('players-data', players);
        diffData.forEach((player) => {
            if (player.status === 'online') {
                createPlayerNotification(mainWindow, player);
            }
        });
    } catch (error) {
        event.reply('players-error', {
            message:
                error instanceof Error
                    ? error.message
                    : 'Unknown error occurred',
        });
    }
});

app.on('window-all-closed', () => {
    app.quit();
});

ipcMain.on('quit-app', () => {
    app.quit();
});

ipcMain.on('minimize-app', () => {
    if (mainWindow) {
        mainWindow.hide();
    }
});
