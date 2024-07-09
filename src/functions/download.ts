import { Notification } from "electron";
import path from "path";
import os from "os";
import fs from "fs";
import { Progress } from "../Progress";
import YTDlpWrap, { YTDlpEventEmitter } from "./core";
import { embed } from "./embed";
import { imageSize } from "image-size";
import YTMusic from "ytmusic-api";
import { DL_Type } from "../VFTypes";

export const download = async (
    opts: DL_Type,
    mainWindow: Electron.BrowserWindow
) => {
    class Download extends YTDlpWrap {
        closed: boolean;
        has_error: boolean;
        Rate_ms: number;
        Rate_state: "ready" | "reset" | "wait";
        mainWindow: Electron.BrowserWindow;
        opts: string[];
        only: boolean;
        pid: number;
        embed: boolean;
        constructor(
            mainWindow: Electron.BrowserWindow,
            opts: string[],
            audioOnly: boolean,
            embed: boolean
        ) {
            super();
            this.closed = false;
            this.has_error = false;
            this.pid = 0;
            this.Rate_ms = 250;
            this.Rate_state = "ready";
            this.mainWindow = mainWindow;
            this.opts = opts;
            this.only = audioOnly;
            this.embed = embed;
            this.setBinaryPath(path.resolve("yt-dlp.exe"));
        }
        async run() {
            const yt_dlp = this.exec(this.opts)
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
                })
                .on("ytDlpEvent", (_, res) => console.log(_, res));

            this.pid =
                yt_dlp.ytDlpProcess?.pid || Math.floor(Math.random() * 999999);
            const info = await this.getVideoInfo(this.opts[0]);
            console.log(info);
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
            if (!this.has_error && !this.closed) {
                this.waitClose(() => {
                    this.notification();
                    console.log(`Audio:${this.only}`);
                    if (this.only) this.EmbedReady(); //ex
                }, 100);
            } else {
                /*
                this.notification({
                    title: "ERROR",
                    uploader: "ERROR",
                    base_url: this.opts[0],
                    thumbnail: "https://wallpapercave.com/wp/wp9414308.png",
                });
                */
            }
        }
        async EmbedReady() {
            console.log("[Embed]");
            let entrieList: string[] = [];
            const ytMusic = new YTMusic();
            await ytMusic.initialize();
            this.exec([
                ...this.opts,
                "--print",
                "after_move:filepath",
                "--print",
                "id",
            ])
                .on("stdout", (event) => {
                    entrieList.push(event.replace(/\n/g, ""));
                    if (entrieList.length % 2 == 0) {
                        console.log(entrieList);
                        ytMusic.getSong(entrieList[0]).then(async (json) => {
                            const image_url = json["thumbnails"].at(-1)?.url;
                            if (!image_url) return;
                            const image_data = imageSize(
                                new Uint8Array(
                                    await (
                                        await (await fetch(image_url)).blob()
                                    ).arrayBuffer()
                                )
                            );
                            if (image_data.height == image_data.width)
                                embed(entrieList[1], image_url);
                            else console.log("!skip!");
                            entrieList = [];
                        });
                    }
                })
                .on("close", () => {
                    console.log("Finish");
                });
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
                    return;
                }
                clearInterval(intervalID);
                resolve();
                console.log("noti return");
            }, interval);
        }
        async notification() {
            const info = await this.getVideoInfo([this.opts[0], "-I", "1"]);
            const notification_data = {
                title: this.escapeStr(info.title) || "ERROR",
                uploader: this.escapeStr(info.uploader) || "ERROR",
                base_url: this.escapeStr(this.opts[0]) || "ERROR",
                thumbnail:
                    this.escapeStr(
                        info._type == "video"
                            ? info.thumbnail
                            : info.entries[0].thumbnail
                    ) || "https://wallpapercave.com/wp/wp9414308.png",
                output: this.escapeStr(
                    (
                        await this.execPromise([
                            ...this.opts[0],
                            "--print",
                            "after_move:filepath",
                            "-I",
                            "1",
                        ])
                    ).replace(/\n/g, "") || path.join(os.homedir(), "Desktop")
                ),
            };
            //console.log(noti_data);
            const image_data = await fetch(notification_data.thumbnail);
            //const file_name = `./thumbnail.${(await image_data.blob()).type}`;
            const image_path = path.resolve("./thumbnail.jpeg");
            fs.writeFileSync(
                image_path,
                Buffer.from(
                    await (
                        await fetch(notification_data.thumbnail)
                    ).arrayBuffer()
                )
            );

            const xml = `
    <toast activationType="protocol" launch="${notification_data.output}">
        <visual>
            <binding template="ToastGeneric">
                <image placement="hero" src="${image_path}"/>
                <text>${notification_data.title}</text>
                <text>${notification_data.uploader}</text>
            </binding>
        </visual>
        <actions>
            <action
                content="PlayNow"
                activationType="protocol"
                arguments="${notification_data.output}"/>    
            <action
                content="Open Folder"
                activationType="protocol"
                arguments="${path.dirname(notification_data.output)}"/>
            <action
                content="Open URL"
                activationType="protocol"
                arguments="${notification_data.base_url.replace(
                    /&/,
                    "&amp;"
                )}"/>
        </actions>
    </toast>`;
            new Notification({
                toastXml: xml,
            }).show();
        }
    }
    new Download(
        mainWindow,
        opts.yt_dlp.slice(0, -1),
        opts.yt_dlp.at(-1) == "audio",
        true
    ).run();
    console.log(opts);
};
