import { YTM } from "../../render/functions/YTMusic";
import { Args } from "../../Types/yt_dlp.type";
import { YTDlpEventEmitter } from "./core";
import { embed } from "./embed";
import { Logger } from "./Logger";
import { yt_dlp } from "./yt_dlp";
export class Download extends yt_dlp {
    private mainWindow: Electron.BrowserWindow;
    private yt_dlp_arg: Args["yt_dlp"];
    private thread_count = 0;
    private processed_thread_count = 0;
    constructor(args: Args, mainWindow: Electron.BrowserWindow) {
        super(args);
        console.log(args.yt_dlp.join(" "));
        console.log(args.custom);
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
        this.thread_count = threads.length;
        console.log(`[${this.thread_count} Threads are processing]`);
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
                    this.customFunc(customThreads, thread);
                    this.mainWindow.webContents.send("close", basic_data.pid);
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
            let image_cache: string[] = [];
            this.exec(customArgs)
                .on("stdout", async (stdout: string) => {
                    image_cache.push(stdout.replace(/\n/g, ""));
                    if (image_cache.length % 2 == 0) {
                        const [id, path] = image_cache;
                        image_cache = [];
                        ytMuisc
                            .getThumbnail(id)
                            .then((image_url: string | undefined) => {
                                if (!image_url) return;
                                embed(path, image_url);
                            });
                    }
                })
                .on("close", () => {
                    this.processed_thread_count += 1;
                    console.log(
                        `${
                            this.thread_count - this.processed_thread_count
                        } Threads are remain`
                    );
                });
        }
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
        }
        return promise_list;
    }
}
