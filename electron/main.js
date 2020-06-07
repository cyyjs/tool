// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
require('./lib/event')
app.name ='工具集'
app.allowRendererProcessReuse = false

const Menu = require('./lib/menu')
const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let willQuitApp = false
let winurl = isDev
  ? 'http://localhost:8088'
  : 'file://' + path.join(__dirname, '../dist/index.html')
global.mainurl = winurl
function createWindow () {
  // Create the browser window.
  global.mainWindow = mainWindow = new BrowserWindow({
    minWidth: 740,
    minHeight: 600,
    width: 740,
    height: 600,
    titleBarStyle: 'hidden',
    webPreferences: {
      enableRemoteModule: false,
      webSecurity: true,
      nodeIntegration: true
    }
  })

  if (isDev) {
    let installExtension = require('electron-devtools-installer')
    installExtension
      .default(installExtension.VUEJS_DEVTOOLS)
      .then(() => { })
      .catch(err => {
        console.log('无法安装 `vue-devtools`: \n', err)
      })
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
  }
  // and load the index.html of the app.

  mainWindow.loadURL(winurl)
  mainWindow.on('close', function (event) {
    if (!willQuitApp) {
      event.preventDefault()
      mainWindow.hide()
    }
  })
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    Menu.showEditor()
  })
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  } else {
    mainWindow.show()
  }
})

app.on('before-quit', () => willQuitApp = true)
