import { BrowserWindow, Notification } from "electron";
import YTDlpWrap from "./dlp";
import path from "path";

export const download = async (opts: string[]) => {
    const mainWindow = BrowserWindow.getAllWindows()[0];
    console.log(opts);
    const yt_dlp = new YTDlpWrap(path.resolve("yt-dlp.exe"));
    let closed = false;
    let Rate_ms = 0.1;
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
            const notification = new Notification({
                toastXml: `
            <toast activationType="protocol">
                <visual>
                    <binding template="ToastGeneric" addImageQuery="true">
                        <image placement="appLogoOverride" src="https://yt3.ggpht.com/RgtdwXfSnZZW3TMNcFag1afQLKRzvrdgu5f4pPb7ca2-aWptFqinZgKTd2YanbZQguBs6ut7kA=s88-c-k-c0x00ffffff-no-nd-rj"/>
                        <text>${noti_data.title}</text>
                        <text>${noti_data.artist}</text>
                    </binding>
                </visual>
                <actions>
                    <action
                        content="Open Folder"
                        arguments="action=commentPhoto&amp;photoId=92187"
                        activationType="protocol"/>
                    <action
                        content="Open Link"
                        arguments="${noti_data.url.replace(/&/, "&amp;")}"
                        activationType="protocol"/>
                </actions>
            </toast>`,
            });
            notification.show();
            notification.on("click", (arg) => {
                console.log(arg);
            });
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
    const noti_data = {
        title: info.fulltitle,
        artist: info.uploader,
        url: opts[0],
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
