import { BrowserWindow } from "electron";
import YTDlpWrap from "./dlp";
import path from "path";

export const download = (opts: string[]) => {
    const mainWindow = BrowserWindow.getAllWindows()[0]
    console.log(opts);
    const yt_dlp = new YTDlpWrap(path.resolve("yt-dlp.exe"));
    const emitter = yt_dlp
        .exec(opts)
        .on("progress", (e) => {
            console.log(e.percent);
        })
        .on("close", (e) => {
            console.log(e);
        })
        .on("error", (e) => {
            console.log(e);
        })
        .on("ytDlpEvent", (e) => {
            console.log(e);
        });
    if (emitter.ytDlpProcess) {
        mainWindow.webContents.send("sendProgress", {
            pid: emitter.ytDlpProcess.pid,
        });
    }
}