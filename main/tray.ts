import { BrowserWindow, Menu, Tray, app, nativeImage } from 'electron';
import path from 'path';

export function createTray(mainWindow: BrowserWindow) {
    const iconPath = app.isPackaged
        ? path.join(process.resourcesPath, 'genIconReal.ico')
        : path.join(__dirname, '..', 'resources', 'genIconReal.ico');

    const icon = nativeImage.createFromPath(iconPath);
    const tray = new Tray(icon);

    tray.setToolTip('GENotifier');
    tray.setContextMenu(
        Menu.buildFromTemplate([
            {
                label: 'Show',
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
