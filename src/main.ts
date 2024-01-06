import path from "path";
import { BrowserWindow, app, dialog, ipcMain, shell } from "electron";
import { load, save } from "./func/config";
import { JSONType } from "./JsonType";
import { setup } from "./func/setup";
const config: JSONType = load();
console.log(config);
if (config.other.update) {
    config.ytdlp_v = await setup(config.ytdlp_v);
}
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
    mainWindow.loadFile("dist/index.html").then(() => {
        mainWindow.webContents.send("ResConfig", config);
    });
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith("http")) {
            shell.openExternal(url);
        }
        return { action: "deny" };
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
    ipcMain.handle("download",()=>{})
    mainWindow.once("close", (event) => {
        event.preventDefault();
        mainWindow.webContents.send("ReqConfig_Save");
    });
    ipcMain.handle("ResConfig_Save", (_, args) => {
        console.log(args);
        save(config)
        app.quit();
    });
}

app.whenReady().then(() => {
    createWindow();
});
