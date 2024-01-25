import { BrowserWindow, Notification } from "electron";
import YTDlpWrap from "./dlp";
import path from "path";
import { c_noti } from "./notification";
import { Noti } from "../Noti";
export const download = async (opts: string[]) => {
    const mainWindow = BrowserWindow.getAllWindows()[0];
    console.log(opts);
    const yt_dlp = new YTDlpWrap(path.resolve("yt-dlp.exe"));
    let closed = false;
    let Rate_ms = 50;
    let Rate_state = 0;
    /*
    0:send progress
    1:in count
    2:set
    */
    const emitter = yt_dlp
        .exec(opts)
        .on("progress", (e) => {
            if (Rate_state == 0) {
                mainWindow.webContents.send("progress", {
                    pid: pid,
                    percent: e.percent,
                });
                Rate_state = 2;
            } else if (Rate_state == 2) {
                setTimeout(() => {
                    Rate_state = 0;
                }, Rate_ms);
                Rate_state = 1;
            } else {
            }
        })
        .on("close", (e) => {
            closed = true;
            console.log(`close in ${pid}`);
            mainWindow.webContents.send("close", pid);
            //c_noti(noti_data)
        })
        .on("error", (e) => {
            console.log(e);
        })
        .on("ytDlpEvent", (e, ee) => {
            console.log(e, ee);
        });
    let pid = emitter.ytDlpProcess?.pid;
    if (!pid) {
        pid = Math.floor(Math.random() * 999999);
        console.log("Rand PID");
    }
    const info = await yt_dlp.getVideoInfo(opts[0]);
    const noti_data:Noti = {
        title: info.fulltitle,
        uploader: info.uploader,
        base_url: opts[0],
        thumbnail:info["thumbnail"]
    };
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
        const playlist = await yt_dlp.execPromise([
            opts[0],
            "-I",
            "1",
            "--print",
            "playlist",
        ]);
        if (playlist != "NA\n") {
            mainWindow.webContents.send("progress", {
                pid: pid,
                title: playlist,
            });
        }
    }
};
