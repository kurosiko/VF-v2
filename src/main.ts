import path from "path";
import { BrowserWindow, Notification, app ,dialog,ipcMain} from "electron";
import { setup } from "./func/setup";
import {load,save} from "./func/config"
import { JSONType } from "./JsonType";
import { download, get_thumbnail } from "./func/download";
let config:JSONType = load()
function createWindow(){
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 480,
    x:1800,
    y:50,
    alwaysOnTop:true,
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
      contextIsolation:true,
      nodeIntegration:false
    }});
    ipcMain.handle("getpath",()=>{
      const path =  dialog
      .showOpenDialogSync(
        {
          title:"Select Path",
          defaultPath:__dirname,
          properties: ['openDirectory']
        }
      )
      mainWindow.webContents.send("sendpath",path)
    })
    ipcMain.handle("ReqConfig",(_event)=>{
      mainWindow.webContents.send("ResConfig",config)
    })
    ipcMain.handle("save",async(_event,_config:JSONType)=>{
      save(_config)
      config = await load()
      mainWindow.webContents.send("ResConfig",config)
    })
    ipcMain.handle("download",(_event,url:string)=>{
      get_thumbnail(url).then((thumbnail:string)=>{       
        console.log(thumbnail)
        mainWindow.webContents.send("thumbnail",{"url":url,"img":thumbnail})
      })
      //download(url,config)
    })


  mainWindow.loadFile("dist/index.html");
  //mainWindow.webContents.openDevTools({ mode: "detach" });
};

app.whenReady().then(() => {
  createWindow();
});

app.once("window-all-closed", () => app.quit());


setup(config)
.then((version:string)=>{
  config.ytdlp_v = version
  save(config)
})
.catch(error=>{
  console.log(error)
})