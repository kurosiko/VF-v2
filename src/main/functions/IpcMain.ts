import { dialog, ipcMain, shell } from "electron";
import path from "path";
import { VF_Window } from "../../main";
import { Args } from "../../Types/yt_dlp.type";
import YTDlpWrap from "./core";
export const IcpMainRegister = (mainwindow: VF_Window) => {
    ipcMain.handle("MainExit", mainwindow.exit);
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
};
