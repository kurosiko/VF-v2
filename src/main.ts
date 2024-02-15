import path from "path";
import { BrowserWindow, app, dialog, ipcMain, shell } from "electron";
import { load, save } from "./func/config";
import { JSONType } from "./JsonType";
import { setup } from "./func/setup";
import { download } from "./func/download";
import { ffdl } from "./func/ffdl";
app.setAppUserModelId("VideoFetcher");
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 500,
        height: 480,
        x: 1800,
        y: 50,
        minHeight: 300,
        minWidth: 500,
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
        download(opts, mainWindow);
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
    ipcMain.handle("open_dir", (_, args) => {
        const _path = path.isAbsolute(args) ? args : path.resolve(args);
        console.log(path.isAbsolute(args));
        console.log(`[IsAbsolute:${_path}]`);
        shell.openPath(_path);
    });
    return mainWindow;
}
const config: JSONType = load();
console.log(config);
app.whenReady().then(() => {
    const mainWindow = createWindow();
    mainWindow.webContents.on("did-stop-loading", async () => {
        console.log("[Setup]");
        console.log(
            `current:\n[yt-dlp:${config.ytdlp_v},ffmpeg:${config.ffmpeg}]`
        );
        mainWindow.webContents.removeAllListeners("did-stop-loading");
        if (config.other.update) {
            config.ytdlp_v = await setup(config.ytdlp_v);
        }
        if (!config.ffmpeg) {
            config.ffmpeg = await ffdl(mainWindow);
            mainWindow.webContents
                .executeJavaScript("window.location.hash='#'")
                .then(() => {
                    mainWindow.webContents.send("ResConfig", config);
                });
        }
    });
});
