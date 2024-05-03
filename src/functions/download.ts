import { Notification } from "electron";
import path from "path";
import os from "os";
import fs from "fs";
import { Noti } from "../Noti";
import { Progress } from "../Progress";
import YTDlpWrap from "./core";
import { embed } from "./embed";
import YTMusic from "ytmusic-api";
import { off } from "process";

export const download = async (
    opts: string[],
    mainWindow: Electron.BrowserWindow
) => {
    class Download extends YTDlpWrap {
        closed: boolean;
        has_error: boolean;
        Rate_ms: number;
        Rate_state: "ready" | "reset" | "wait";
        mainWindow: Electron.BrowserWindow;
        opts: string[];

        pid: number;

        constructor(mainWindow: Electron.BrowserWindow, opts: string[]) {
            super();
            this.closed = false;
            this.has_error = false;
            this.pid = 0;
            this.Rate_ms = 1000;
            this.Rate_state = "ready";
            this.mainWindow = mainWindow;
            this.opts = opts;
            this.setBinaryPath(path.resolve("yt-dlp.exe"));
        }
        async run() {
            const yt_dlp = this.exec(opts)
                .on("progress", (event) => {
                    if (this.Rate_state == "ready") {
                        this.mainWindow.webContents.send("progress", {
                            pid: this.pid,
                            percent: event.percent,
                        });
                        this.Rate_state = "reset";
                    } else if (this.Rate_state == "reset") {
                        setTimeout(() => {
                            this.Rate_state = "ready";
                        }, this.Rate_ms);
                        this.Rate_state = "wait";
                    }
                })
                .on("close", () => {
                    this.closed = true;
                    this.mainWindow.webContents.send("close", this.pid);
                });
            this.pid = yt_dlp.ytDlpProcess?.pid
                ? yt_dlp.ytDlpProcess?.pid
                : Math.floor(Math.random() * 999999);
            const info = await this.getVideoInfo(opts[0]);
            const base_data: Progress = {
                pid: this.pid,
                title: info.title,
                thumbnail:
                    info._type == "playlist"
                        ? info.entries[0].thumbnail
                        : info.thumbnail,
                percent: 0,
            };
            if (!this.closed)
                mainWindow.webContents.send("sendBase", base_data);
            if (!this.has_error) {
                const noti_data = {
                    title: this.escapeStr(info.title),
                    uploader: this.escapeStr(info.uploader),
                    base_url: this.escapeStr(opts[0]),
                    thumbnail: this.escapeStr(
                        info._type == "video"
                            ? info.thumbnail
                            : info.entries[0].thumbnail
                    ),
                    output: this.escapeStr(
                        (
                            await this.execPromise([
                                ...opts,
                                "--print",
                                "filename",
                                "-I",
                                "1",
                            ])
                        ).replace(/\n/g, "")
                    ),
                };

                this.waitClose(() => {
                    this.notification(noti_data);
                    if (true) this.Embed(this.opts[0], noti_data.output); //ex
                }, 100);
            } else {
                this.notification({
                    title: "ERROR",
                    uploader: "ERROR",
                    base_url: opts[0],
                    thumbnail: "https://wallpapercave.com/wp/wp9414308.png",
                });
            }
        }
        async Embed(url: string, output: string) {
            console.log("EmbedRUN");
            console.log(url)
            console.log(output)
            const yt = new YTMusic();
            await yt.initialize();
            const id = await this.execPromise([url, "--get-id"]);
            console.log(id)
            const image_url = (await yt.getSong(id.replace(/\n/g,"")))["thumbnails"].at(-1)?.url;
            console.log(image_url)
            if (!image_url) return;
            const prew = output.split(".")[0]+".mp3"
            console.log(prew);
            if (!prew)
                return
            embed(prew,image_url);
        }
        escapeStr(str: string) {
            return str.replace(/&/g, "&amp;");
        }
        waitClose(resolve: Function, interval: number) {
            console.log("noti wait");
            if (this.closed) {
                console.log("noti return");
                resolve();
                return;
            }
            const intervalID = setInterval(() => {
                if (!this.closed) {
                    console.log("wait noti");
                    return;
                }
                clearInterval(intervalID);
                resolve();
                console.log("noti return");
            }, interval);
        }
        async notification(noti_data: Noti) {
            const image_data = await fetch(noti_data.thumbnail);
            //const file_name = `./thumbnail.${(await image_data.blob()).type}`;
            const image_path = path.resolve("./thumbnail.jpeg");
            if (!noti_data.output) {
                noti_data.output = path.join(os.homedir(), "Desktop");
            }
            if (!noti_data.thumbnail) {
                noti_data.thumbnail =
                    "https://wallpapercave.com/wp/wp9414308.png";
            }
            fs.writeFileSync(
                image_path,
                Buffer.from(
                    await (await fetch(noti_data.thumbnail)).arrayBuffer()
                )
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
        </actions>
    </toast>`;
            new Notification({
                toastXml: xml,
            }).show();
        }
    }
    new Download(mainWindow, opts).run();
    console.log(opts);
};
