import path from "path";
import {
    BrowserWindow,
    Notification,
    app,
    dialog,
    ipcMain,
    shell,
} from "electron";

import { load, save } from "./functions/json_io";
import { DL_Type, JSONType, WinState } from "./VFTypes";
import { setup } from "./init/setup";
import { download } from "./functions/download";
import { ffdl } from "./functions/ffdl";
import { targetList } from "./functions/List";
import { def_cfg, def_win } from "./init/default";
app.setAppUserModelId("VideoFetcher");

class VF_Window {
    win_state: WinState;
    config: JSONType;
    mainWindow: BrowserWindow;
    constructor() {
        this.win_state = load(targetList("window")) || def_win;
        this.config = load(targetList("config")) || def_cfg;
        new Notification({ title: "Please Wait", body: "Booting..." }).show();
        this.mainWindow = new BrowserWindow({
            x: this.win_state.x,
            y: this.win_state.y,
            height: this.win_state.height,
            width: this.win_state.width,
            minHeight: 300,
            minWidth: 500,
            alwaysOnTop: true,
            show: false,
            webPreferences: {
                preload: path.resolve(__dirname, "preload.js"),
                contextIsolation: true,
                nodeIntegration: false,
            },
        });
        this.mainWindow.loadFile("dist/index.html");
        this.Register();
        this.dl_assets().then(() => {
            this.mainWindow.webContents.send("ResConfig", this.config);
            this.mainWindow.show();
        });
    }
    async exit(
        x: number,
        y: number,
        height: number,
        width: number,
        config: JSONType
    ) {
        await save(
            { x: x, y: y, height: height, width: width },
            targetList("window")
        );
        console.log(config);
        await save(config, targetList("config"));
    }
    async dl_assets() {
        await setup(this.config.ytdlp_v).then((version: string) => {
            this.config.ytdlp_v = version;
        });
        await ffdl(this.mainWindow).then((bol: boolean) => {
            this.config.ffmpeg = bol;
        });
    }
    Register() {
        this.mainWindow.on("moved", () => {
            console.log("Pos", this.mainWindow.getPosition());
            console.log("Size", this.mainWindow.getSize());
        });
        this.mainWindow.on("close", (event) => {
            event.preventDefault();
            console.log("blocked");
            this.mainWindow.webContents.send("exit_req");
        });
        ipcMain.handle("exit_res", (_, args: JSONType) => {
            const [x, y] = this.mainWindow.getPosition();
            const [width, height] = this.mainWindow.getSize();
            console.log(x, y, height, width);
            this.exit(x, y, height, width, args);
            if (args.dir != "null") {
                app.exit();
            }
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
        ipcMain.handle("download", (_, opts: DL_Type) => {
            download(opts, this.mainWindow);
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
