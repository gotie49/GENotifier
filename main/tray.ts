import { BrowserWindow, Menu, Tray, app, nativeImage } from 'electron';
import path from 'path';

export function createTray(mainWindow: BrowserWindow) {
    const iconPath = path.join(__dirname, 'assets', 'trayIconTemplate.png');
    const icon = nativeImage.createFromPath(iconPath);
    const tray = new Tray(icon);
    {
        /* TODO */
    }
    tray.setToolTip('GENotifier');
    tray.setContextMenu(
        Menu.buildFromTemplate([
            {
                label: 'Show App',
                click: () => {
                    mainWindow.show();
                },
            },
            {
                label: 'Quit',
                click: () => {
                    app.quit();
                },
            },
        ])
    );
}
