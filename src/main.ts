import path from "path";
import {
    BrowserWindow,
    app,
    dialog,
    ipcMain,
    shell,
} from "electron";
import { load, save } from "./func/config";
import { JSONType } from "./JsonType";
import { setup } from "./func/setup";
import { download } from "./func/download";
import { exec } from "child_process";
const config: JSONType = load();
console.log(config);
if (config.other.update) {
    config.ytdlp_v = await setup(config.ytdlp_v);
}
app.setAppUserModelId("VideoFetcher");
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
    ipcMain.handle("ReqConfig", () => {
        mainWindow.webContents.send("ResConfig", config);
    });
    ipcMain.handle("ReqPath", () => {
        const path = dialog.showOpenDialogSync({
            title: "Select Path",
            defaultPath: __dirname,
            properties: ["openDirectory"],
        });
        console.log(path);
        mainWindow.webContents.send("ResPath", path);
    });
    ipcMain.handle("download", (_, opts: string[]) => {
        download(opts);
    });
    mainWindow.on("close", (event) => {
        console.log("blocked");
        event.preventDefault();
        mainWindow.webContents.send("ReqConfig_Save");
    });
    ipcMain.handle("ResConfig_Save", (_, args: JSONType) => {
        mainWindow.removeAllListeners("close");
        if (args.dir != "null") save(args);
        app.quit();
    });
    ipcMain.handle("open_dir", (_) => {
        exec(`explorer.exe ${path.resolve("./")}`);
    })
    return mainWindow;
}

app.whenReady().then(() => {
    createWindow();
});
