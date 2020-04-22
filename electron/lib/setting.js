const { BrowserWindow } = require('electron')
class Setting {
  constructor () {
    this.win = null
  }
  close () {
    this.win.hide()
    this.win = null
  }
  open () {
    this.win = new BrowserWindow({
      parent: global.mainWindow,
      modal: true,
      width: 400,
      height: 210,
      show: false,
      resizable: false,
      webPreferences: {
        enableRemoteModule: false,
        webSecurity: true,
        nodeIntegration: true
      }
    })
    // this.win.webContents.openDevTools()
    // 加载远程URL
    this.win.loadURL(global.mainurl+'#setting')
    this.win.once('ready-to-show', () => {
      this.win.show()
    })
  }
}

module.exports = new Setting()