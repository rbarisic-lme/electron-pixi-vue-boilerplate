'use strict'

import { globalShortcut, screen, app, protocol, BrowserWindow, ipcMain } from 'electron'
import {
  createProtocol,
  /* installVueDevtools */
} from 'vue-cli-plugin-electron-builder/lib'
import path from 'path'

import TrayIcon from './trayIcon.js'
const isDevelopment = process.env.NODE_ENV !== 'production'

process.env.windir = 'C:\\Windows\\'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

console.log(BrowserWindow)

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true } }])

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    // globalShortcut.unregisterAll()
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
  }
  let dataPath = ""

  if (isDevelopment) {
    dataPath = path.join(__dirname, '../buildResources')
  } else {
    dataPath = path.join(dataPath, 'resources');
  }

  let display = screen.getPrimaryDisplay()

  // let windowHeight = 320;
  let windowHeight = 1280;
  let windowWidth = 720;

  let winSettings = {
    width: windowWidth,
    height: windowHeight,
    y: (display.bounds.height / 2) - (windowHeight / 3),
    x: (display.bounds.width / 2) - (windowWidth / 2),
    // y: (display.bounds.height / 2) - (windowHeight / 2),
    // x: (display.bounds.width / 2) - (windowWidth / 2),
    frame: false,
    // alwaysOnTop: true,
    // backgroundColor: "#00FFFFFF",
    backgroundColor: "#3388ff",
    // transparent: true,
    // titleBarStyle: 'hidden',
    minimizable: false,
    maximizable: false,
    closable: false,
    resizable: false,
    movable: false,
    icon: path.join(dataPath, 'logo.ico'),
    webPreferences: {
      nodeIntegration: true
    }
  };

  if (isDevelopment) {
    winSettings.frame = true;
    winSettings.closable = true;
    winSettings.resizable = true;
    winSettings.movable = true;
    winSettings.alwaysOnTop= false;
    winSettings.height = 700;
    winSettings.width = 1200;
  }

  win = new BrowserWindow(winSettings)

  const trayIcon = TrayIcon(win)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  ipcMain.on('sync', (event, arg) => {
    // console.log('wants me to relaunch');
    // app.quit();
    // app.relaunch();
  })

  win.on('closed', () => {
    win = null
  })
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
