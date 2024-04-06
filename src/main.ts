import path from "path";
import { BrowserWindow, app, dialog, ipcMain, shell } from "electron";

import { load, save } from "./functions/json_io";
import { JSONType, WinState } from "./VFTypes";
import { setup } from "./functions/setup";
import { download } from "./functions/download";
import { ffdl } from "./functions/ffdl";
import { targetList } from "./functions/List";
app.setAppUserModelId("VideoFetcher");

/*
 */
class VF_Window {
    win_state: WinState;
    config: JSONType;
    mainWindow: BrowserWindow;
    constructor() {
        this.win_state = load(targetList("window"));
        this.config = load(targetList("config"));
        this.mainWindow = new BrowserWindow({
            x: this.win_state.x,
            y: this.win_state.y,
            height: this.win_state.height,
            width: this.win_state.width,
            minHeight: 300,
            minWidth: 500,
            alwaysOnTop: true,
            webPreferences: {
                preload: path.resolve(__dirname, "preload.js"),
                contextIsolation: true,
                nodeIntegration: false,
            },
        });
        this.Register();
        this.mainWindow.loadFile("dist/index.html").then(this.dl_assets);
    }
    exit(x: number, y: number, height: number, width: number) {
        save({ x: x, y: y, height: height, width: width },targetList("window"));
        save(this.config);
    }
    dl_assets() {
        setup(this.config.ytdlp_v);
        ffdl(this.mainWindow);
    }
    Register() {
        this.mainWindow.on("close", (event) => {
            event.preventDefault();
            const [x, y] = this.mainWindow.getPosition();
            const [height, width] = this.mainWindow.getSize();
            this.exit(x, y, height, width);
            console.log(x, y, height, width);
        });
        ipcMain.handle("ReqConfig", () => {
            this.mainWindow.webContents.send("ResConfig", this.config);
        });
        ipcMain.handle("ReqPath", () => {
            this.mainWindow.webContents.send(
                "ResPath",
                dialog.showOpenDialogSync({
                    title: "Select Path",
                    defaultPath: __dirname,
                    properties: ["openDirectory"],
                })
            );
        });
        ipcMain.handle("download", (_, opts: string[]) => {
            download(opts, this.mainWindow);
        });
        ipcMain.handle("ResConfig_Save", (_, args: JSONType) => {
            this.mainWindow.removeAllListeners("close");
            if (args.dir != "null") app.quit();
        });
        ipcMain.handle("open_dir", (_, args) => {
            shell.openPath(path.isAbsolute(args) ? args : path.resolve(args));
        });
        ipcMain.handle(
            "ReqAdd",
            (
                _,
                add_obj: {},
                target: "audio" | "video",
                list: "codecList" | "qualityList" | "defaultList",
                add: boolean
            ) => {
                this.mainWindow.webContents.send(
                    "add",
                    add_obj,
                    target,
                    list,
                    add
                );
            }
        );
    }
}
app.whenReady().then(() => {
    new VF_Window();
});
/**/
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
/*
function createWindow() {
    const win_state: WinState = load(targetList("window"));
    const mainWindow = new BrowserWindow({
        x: win_state.x,
        y: win_state.y,
        height: win_state.height,
        width: win_state.width,
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
    ipcMain.handle("download", (_, opts: string[]) => {
        download(opts, mainWindow);
    });
    ipcMain.handle("ReqConfig", () => {
        mainWindow.webContents.send("ResConfig", config);
    });
    mainWindow.on("close", (event) => {
        console.log("blocked");
        event.preventDefault();
        mainWindow.webContents.send("ReqConfig_Save");
    });
    ipcMain.handle("ResConfig_Save", (_, args: JSONType) => {
        mainWindow.removeAllListeners("close");
        if (args.dir != "null") {
        }
        app.quit();
    });
    ipcMain.handle("open_dir", (_, args) => {
        const _path = path.isAbsolute(args) ? args : path.resolve(args);
        console.log(path.isAbsolute(args));
        console.log(`[IsAbsolute:${_path}]`);
        shell.openPath(_path);
    });
    ipcMain.handle(
        "ReqAdd",
        (
            _,
            add_obj: {},
            target: "audio" | "video",
            list: "codecList" | "qualityList" | "defaultList",
            add: boolean
        ) => {
            console.log(target);
            mainWindow.webContents.send("add", add_obj, target, list, add);
        }
    );
    return mainWindow;
}
const config: JSONType = load(targetList("config"));
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
*/
