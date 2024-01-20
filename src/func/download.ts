import { BrowserWindow } from "electron";
import YTDlpWrap from "./dlp";
import path from "path";

export const download = async (opts: string[]) => {
    const mainWindow = BrowserWindow.getAllWindows()[0];
    console.log(opts);
    const yt_dlp = new YTDlpWrap(path.resolve("yt-dlp.exe"));
    let closed = false;
    const emitter = yt_dlp
        .exec(opts)
        .on("progress", (e) => {
            console.log(e.percent);
            mainWindow.webContents.send("progress", {
                percent: e.percent,
            });
        })
        .on("close", (e) => {
            closed = true;
            console.log(`close in ${pid}`);
            mainWindow.webContents.send("close", pid);
        })
        .on("error", (e) => {
            console.log(e);
        })
        .on("ytDlpEvent", (e, ee) => {
            //console.log(e, ee);
        });
    const info = await yt_dlp.getVideoInfo(opts[0]);
    //console.log(info);
    const pid = emitter.ytDlpProcess?.pid;
    const base_data = {
        pid: pid,
        title: info["fulltitle"],
        thumbnail: info["thumbnail"],
        percent: 0,
    };
    console.log(base_data);
    if (!closed) {
        mainWindow.webContents.send("sendBase", base_data);
        console.log(`from ${pid}`);
    }
};
