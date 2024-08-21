import {
    BrowserWindow,
    Notification,
    app,
    dialog,
    ipcMain,
    shell,
} from "electron";
import path, { resolve } from "path";

import { ffdl } from "./main/init/ffdl";
import { IcpMainRegister } from "./main/functions/IpcMain";
import { load, save } from "./main/functions/json_io";
import { targetList } from "./main/functions/TargetList";
import { def_cfg, def_win } from "./main/init/default";
import { setup } from "./main/init/setup";
import { DL_Type, JSONType, WinState } from "./Types/VFTypes";
import { exit } from "process";
app.setAppUserModelId("VideoFetcher");
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
            this.webContents.send("MainExit");
            event.preventDefault();
        });
        IcpMainRegister(this);
        
        this.on("ready-to-show", () => {
            if (!(this.config.ytdlp_v == "null") || this.config.ffmpeg) return;
            this.webContents.send("setup", "Link(init)");
            Promise.all([
                new Promise(async (resolve, reject) => {
                    this.config = await setup(this.config);
                    resolve(this.config);
                }),
                new Promise(async (resolve, reject) => {
                    this.config = await ffdl(this.config);
                    resolve(this.config);
                }),
            ])
                .then(() => this.webContents.send("setup", "succsess"))
                .catch((err) => {
                    this.webContents.send("setup", `failed:${err}`);
                })
                .finally(() => {
                    console.log("SetupEnded");
                    this.webContents.send("setup", "");
                });
            console.log("Setup");
        });
    }
    
}

app.whenReady().then(() => {
    const bootConfig: Boot = {
        win_state: load(targetList("window")) || def_win,
        config: load(targetList("config")) || def_cfg,
    };
    bootConfig.config.ffmpeg = false;
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
//
