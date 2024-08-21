import { app, dialog, ipcMain, shell } from "electron";
import path from "path";
import { VF_Window } from "../../main";
import { Args } from "../../Types/yt_dlp.type";
import YTDlpWrap from "./core";
import { save } from "./json_io";
import { targetList } from "./TargetList";
export const IcpMainRegister = (mainwindow: VF_Window) => {
    ipcMain.handle("download", (_, options: Args) => {
        return new YTDlpWrap(path.resolve("./yt_dlp.exe")).exec(options.yt_dlp);
        //new Download(options, mainwindow).run();
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
    ipcMain.handle("config", () => mainwindow.config);
    ipcMain.handle("MainExit", async (_, config) => {
        console.log("Exit")
        const [x, y] = mainwindow.getPosition();
        const [width, height] = mainwindow.getSize();
        await save(config, targetList("config"));
        await save(
            { x: x, y: y, height: height, width: width },
            targetList("window")
        );
        if (config.dir != "null") {
            mainwindow.destroy();
            app.exit();
        }
    });
};
