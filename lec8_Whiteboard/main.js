//npm init
//npm install electron
//add "start":"electron ."


const electron =require("electron");

const app=electron.app;

const BrowserWindow=electron.BrowserWindow;


function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,//desktop application node enabled hpjaega
        enableRemoteModule:true
      }
    })
  
    win.loadFile('index.html').then(function(){
        win.maximize();
        win.webContents.openDevTools()//dev tools are opened
    })
   
  }
  
app.whenReady().then(createWindow)
