import { app, dialog, ipcMain, shell } from "electron";
import path from "path";
import { VF_Window } from "../../main";
import { Args } from "../../Types/yt_dlp.type";
import { saveConfig } from "./json_io";
import { Download } from "./download";
export const IcpMainRegister = (mainwindow: VF_Window) => {
    ipcMain.handle("download", (_, options: Args) => {
        return new Download(options, mainwindow).run();
    });
    ipcMain.handle("path", () => {
        return dialog.showOpenDialogSync({
            title: "Select Path",
            defaultPath: __dirname,
            properties: ["openDirectory"],
        });
    });
    ipcMain.handle("open_dir", (_, args) => {
        shell.openPath(path.isAbsolute(args) ? args : path.resolve(args));
    });
    ipcMain.handle("config", () => {
        return mainwindow.config;
    });
    ipcMain.handle("MainExit", async (_, config) => {
        if (!mainwindow.isDestroyed()) {
            if (config.dir == "null") return;
            console.log(config);
            const [x, y] = mainwindow.getPosition();
            const [width, height] = mainwindow.getSize();
            saveConfig("config", config);
            saveConfig(
                "window",
                { x: x, y: y, height: height, width: width },
            );
        }
        if (config.dir != "null") {
            mainwindow.destroy();
            app.exit();
        }
    });
};
