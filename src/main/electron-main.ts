import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import * as path from 'path';
import * as os from 'os';
import ViGEmClient = require("vigemclient");
import { X360Controller } from "vigemclient/lib/X360Controller";

let win: BrowserWindow | null = null;
let client = new ViGEmClient();
let controller: X360Controller;

app.on('ready', createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Disabled Node integration
      nodeIntegration: false,
      // protect against prototype pollution
      contextIsolation: true,
      // turn off remote
      //enableRemoteModule: false,
      // Preload script
      preload: path.join(app.getAppPath(), 'dist/preload', 'preload.js')
    }
  });

  // https://stackoverflow.com/a/58548866/600559
  //Menu.setApplicationMenu(null);

  win.loadFile(path.join(app.getAppPath(), 'dist/renderer', 'index.html'));
  let result = client.connect();

  if(result == null){
    controller = client.createX360Controller();
    controller.connect();
    console.log("Connected client and created controller.");
  } else {
    console.log("Error connecting client: " + result.message);
  }


  win.on('closed', () => {
    win = null;
  });
}

ipcMain.on('dev-tools', () => {
  if (win) {
    win.webContents.toggleDevTools();
  }
});

// ipcMain.on('controller-init', () => {
//   controllerManager.initialize();
// });

ipcMain.on('update-axis', (event, arg) => {
  console.log("Main recieved axis value: " + arg);
  let result = controller.axis.leftX.setValue(arg);

  if(result != null){
    console.log(result.message);
  }

});

ipcMain.on('controller', () => {

})


