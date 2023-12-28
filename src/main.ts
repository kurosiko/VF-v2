import path from "path";
import { BrowserWindow, app, dialog, ipcMain } from "electron";
import { load, save } from "./func/config";
import { JSONType } from "./JsonType";
const config: JSONType = load();
console.log(config);
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 500,
        height: 480,
        x: 1800,
        y: 50,
        alwaysOnTop: true,
        webPreferences: {
            preload: path.resolve(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });
    /*
    ipcMain.handle("getpath",()=>{
      const path =  dialog
      .showOpenDialogSync(
        {
          title:"Select Path",
          defaultPath:__dirname,
          properties: ['openDirectory']
        }
      )
      mainWindow.webContents.send("ResPath",path)
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
    }
    )
    */
    mainWindow.loadFile("dist/index.html").then(() => {
      mainWindow.webContents.send("ResConfig", config);
    });
    ipcMain.handle("ReqConfig", (_, args) => {});
    ipcMain.handle("ReqPath", () => {
        const path = dialog.showOpenDialogSync({
            title: "Select Path",
            defaultPath: __dirname,
            properties: ["openDirectory"],
        });
        console.log(path);
        mainWindow.webContents.send("ResPath", path);
    });
    //mainWindow.focus();
}

app.whenReady().then(() => {
    createWindow();
});

app.once("window-all-closed", () => app.quit());
