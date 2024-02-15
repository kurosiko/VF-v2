import { BrowserWindow, Notification } from "electron";
import YTDlpWrap from "./dlp";
import path from "path";
import os from "os";
import fs from "fs";
import { Noti } from "../Noti";
async function notification(noti_data: Noti) {
    const image_path = path.resolve("./thumbnail.png");
    if (!noti_data.output) {
        noti_data.output = path.join(os.homedir(), "Desktop");
    }
    if (!noti_data.thumbnail) {
        noti_data.thumbnail = "https://wallpapercave.com/wp/wp9414308.png";
    }
    fs.writeFileSync(
        image_path,
        Buffer.from(await (await fetch(noti_data.thumbnail)).arrayBuffer())
    );
    const xml = `
        <toast activationType="protocol" launch="${noti_data.output}">
        <visual>
            <binding template="ToastGeneric">
                <image placement="hero" src="${image_path}"/>
                <text>${noti_data.title}</text>
                <text>${noti_data.uploader}</text>
            </binding>
        </visual>
        <actions>
            <action
                content="PlayNow"
                activationType="protocol"
                arguments="${noti_data.output}"/>    
            <action
                content="Open Folder"
                activationType="protocol"
                arguments="${path.dirname(noti_data.output)}"/>
            <action
                content="Open URL"
                activationType="protocol"
                arguments="${noti_data.base_url.replace(/&/, "&amp;")}"/>
            <action
                content='Did u find this?'
                arguments="https://www.canvas.ac/"
                placement='contextMenu'
                activationType="protocol"/>
        </actions>
    </toast>`;
    console.log(xml);
    new Notification({
        toastXml: xml,
    }).show();
}

export const download = async (
    opts: string[],
    mainWindow: Electron.BrowserWindow
) => {
    console.log(opts);
    console.log(opts.join(" "));
    const yt_dlp = new YTDlpWrap(path.resolve("yt-dlp.exe"));
    let closed = false;
    let has_error = false;
    let Rate_ms = 50;
    let Rate_state = 0;
    /*
    0 = run
    1 = 
    2 = wait
    */
    let noti_data: Noti;
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
            }
        })
        .on("close", () => {
            closed = true;
            console.log(`close in ${pid}`);
            mainWindow.webContents.send("close", pid);
        })
        .on("error", (e) => {
            closed = true;
            has_error = true;
            mainWindow.webContents.send("close", pid);
            console.log(e);
        })
        .on("ytDlpEvent", (e, ee) => {
            //console.log(e,ee)
        });
    let pid = emitter.ytDlpProcess?.pid;
    if (!pid) {
        pid = Math.floor(Math.random() * 999999);
        console.log("Rand PID");
    }
    const info = await yt_dlp.getVideoInfo(opts[0]);
    const base_data = {
        pid: pid,
        title: info.title,
        thumbnail: info.thumbnail,
        percent: 0,
    };
    if (!closed) {
        console.log(base_data);
        mainWindow.webContents.send("sendBase", base_data);
        console.log(`from ${pid}`);
        if (info._type == "playlist" && !opts.includes("--no-playlist")) {
            mainWindow.webContents.send("progress", {
                title: info.title,
            });
        }
    }
    if (!has_error) {
        noti_data = {
            title: info.title,
            uploader: info.uploader,
            base_url: opts[0],
            thumbnail: info.thumbnail,
            output: `${await yt_dlp.execPromise([
                ...opts,
                "--print",
                "filename",
                "-I",
                "1",
            ])}`.replace(/\n/g, ""),
        };
        noti_data = {
            title: noti_data.title.replace(/&/g, "&amp;"),
            uploader: noti_data.uploader.replace(/&/g, "&amp;"),
            base_url: noti_data.base_url.replace(/&/g, "&amp;"),
            thumbnail: noti_data.thumbnail.replace(/&/g, "&amp;"),
            output: noti_data.output,
        };
        console.log(noti_data);
        function waitClose(resolve: Function, interval: number) {
            console.log("noti wait");
            if (closed) {
                console.log("noti return");
                resolve();
                return;
            }
            const intervalID = setInterval(() => {
                if (!closed) {
                    return;
                }
                clearInterval(intervalID);
                resolve();
                console.log("noti return");
            }, interval);
        }
        waitClose(() => {
            console.log("noti run");
            notification(noti_data);
        }, 100);
    } else {
        notification({
            title: "ERROR",
            uploader: "Something worng!",
            base_url: opts[0],
            thumbnail: "https://wallpapercave.com/wp/wp9414308.png",
        });
    }
};
