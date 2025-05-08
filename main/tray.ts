import { BrowserWindow, Menu, Tray, app } from "electron";

export function createTray(mainWindow: BrowserWindow) {
  const tray = new Tray("../resources/icon.ico"); //?

  {
    /* TODO */
  }
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Maximize",
        click: () => {
          mainWindow.maximize();
        },
      },
      {
        label: "Quit",
        click: () => {
          app.quit();
        },
      },
    ])
  );
}
