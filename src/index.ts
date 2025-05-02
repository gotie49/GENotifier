import { app, BrowserWindow } from 'electron'
import { fetchPlayerData } from './api/fetchPlayerData'

fetchPlayerData()
  .then(players => {
    console.log(`Player Array: ${players.length}`);
    players.forEach(player => {
      console.dir(player, { depth: null });
    })
  })
  .catch(error => {
    console.error('Failed to fetch player data:', error);
  });

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('dist/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})