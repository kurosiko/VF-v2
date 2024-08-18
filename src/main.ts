import {
    BrowserWindow,
    Notification,
    app,
    dialog,
    ipcMain,
    shell,
} from "electron";
import path from "path";

import { ffdl } from "./main/functions/ffdl";
import { IcpMainRegister } from "./main/functions/IpcMain";
import { load, save } from "./main/functions/json_io";
import { targetList } from "./main/functions/TargetList";
import { def_cfg, def_win } from "./main/init/default";
import { setup } from "./main/init/setup";
import { DL_Type, JSONType, WinState } from "./Types/VFTypes";
app.setAppUserModelId("VideoFetcher");

class VF_Window2 {
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
        ipcMain.handle("exitHandler", (_, args: JSONType) => {
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
            //download(opts, this.mainWindow);
        });
        ipcMain.handle("open_dir", (_, args) => {
            shell.openPath(path.isAbsolute(args) ? args : path.resolve(args));
        });
    }
}
type Boot = {
    win_state: WinState;
    config: JSONType;
};
export class VF_Window extends BrowserWindow {
    config: JSONType;
    constructor(
        options: Electron.BrowserWindowConstructorOptions,
        BootConfig: Boot
    ) {
        super(options);
        this.config = BootConfig.config;
        this.loadFile("dist/index.html");
        this.on("close", (event) => {
            event.preventDefault();
            this.webContents.send("MainExit");
        });
        IcpMainRegister(this);
    }
    async exit(_: Electron.IpcMainInvokeEvent, config: JSONType) {
        const [x, y] = this.getPosition();
        const [width, height] = this.getSize();
        await save(config, targetList("config"));
        await save(
            { x: x, y: y, height: height, width: width },
            targetList("window")
        );
        if (config.dir != "null") {
            this.destroy();
            app.exit();
        }
    }
}

app.whenReady().then(() => {
    const bootConfig: Boot = {
        win_state: load(targetList("window")) || def_win,
        config: load(targetList("config")) || def_cfg,
    };
    const mainWindow = new VF_Window(
        {
            x: bootConfig.win_state.x,
            y: bootConfig.win_state.y,
            height: bootConfig.win_state.height,
            width: bootConfig.win_state.width,
            minHeight: 300,
            minWidth: 500,
            alwaysOnTop: true,
            webPreferences: {
                preload: path.resolve(__dirname, "preload.js"),
                contextIsolation: true,
                nodeIntegration: false,
            },
        },
        bootConfig
    );
});
/*
    const mainWindow = app.createWindow();
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
