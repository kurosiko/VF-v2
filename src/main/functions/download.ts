import { YTM } from "../../render/functions/YTMusic";
import { Args } from "../../Types/yt_dlp.type";
import { YTDlpEventEmitter } from "./core";
import { embed } from "./embed";
import { Logger } from "./Logger";
import { yt_dlp } from "./yt_dlp";

export class Download extends yt_dlp {
    private mainWindow: Electron.BrowserWindow;
    private yt_dlp_arg: Args["yt_dlp"];
    constructor(args: Args, mainWindow: Electron.BrowserWindow) {
        super(args);
        this.mainWindow = mainWindow;
        this.yt_dlp_arg = args.yt_dlp;
    }
    escapeStr(str: string) {
        return str.replace(/&/g, "&amp;");
    }
    async run() {
        const tasks = await this.analyze();
        if (!tasks) return;
        const [threads, info, customThreads] = tasks;
        for (const thread of threads) {
            console.log(thread.ytDlpProcess?.spawnargs);
            const basic_data = {
                pid:
                    thread.ytDlpProcess?.pid ||
                    Math.floor(Math.random() * 999999),
                title: info.title,
                uploader: info.uploader,
                thumbnail: info.thumbnail,
            };
            this.mainWindow.webContents.send("progress", {
                ...basic_data,
                base: true,
            });
            thread.on("progress", (progress) => {
                this.mainWindow.webContents.send("progress", {
                    pid: basic_data.pid,
                    percent: progress.percent,
                });
            });
            thread.on("error", (error) => {
                Logger(error.message, this.args);
                this.mainWindow.webContents.send("error", basic_data.pid);
            });
            thread.on("close", async () => {
                if (Object.values(customThreads).some((bol) => bol)) {
                    Promise.all(
                        await this.customFunc(customThreads, thread)
                    ).then(() => {
                        this.mainWindow.webContents.send(
                            "close",
                            basic_data.pid
                        );
                    });
                } else {
                    this.mainWindow.webContents.send("close", basic_data.pid);
                }
            });
        }
    }
    async customFunc(customThreads: Args["custom"], thread: YTDlpEventEmitter) {
        const ytMuisc = new YTM();
        await ytMuisc.initialize();
        const yt_dlp_arg_base = thread.ytDlpProcess?.spawnargs;
        yt_dlp_arg_base?.shift();
        const customArgs = [...(yt_dlp_arg_base || this.yt_dlp_arg)];
        let promise_list = [];
        if (customThreads.ytmImage) {
            customArgs.push(
                ...["--print", "id", "--print", "after_move:filepath"]
            );
            let image_cache = [];
            promise_list.push(
                this.exec(customArgs).on("stdout", async (stdout: string) => {
                    console.log(stdout);
                    /*
                    image_cache.push(stdout.replace(/\n/g, ""));
                    if (image_cache.length == 2) {
                        const [id, path] = image_cache;
                        const image_url = await ytMuisc.getThumbnail(id);
                        if (!image_url) return;
                        embed(path, image_url);
                    }
                    */
                })
            );
        }
        /*
        if (customThreads.lyric) {
            customArgs.concat(["--print", "title", "--print", "artist"]);
            let lyric_cache = [];
            promise_list.push(
                this.exec(customArgs).on("stdout", (stdout: string) => {
                    lyric_cache.push(stdout.replace(/\n/g, ""));
                    if (lyric_cache.length == 2) {
                        const [title, artist] = lyric_cache;
                        ytMuisc.Lyric(title, artist);
                    }
                })
            );
        }*/
        return promise_list;
    }
}
