import YTDlpWrap, { YTDlpEventEmitter } from "./core";
import path from "path";
import { Args } from "./yt_dlp.type";
import { Lyric } from "./Lyric";

export class yt_dlp extends YTDlpWrap {
    private url: string;
    private process_queue: number = 10;
    private use_multiproess: number = 20;
    private customArg: Args["custom"];
    args: string[];
    constructor(whole_args: Args) {
        super(path.resolve("yt-dlp.exe"));
        this.url = whole_args.yt_dlp[0];
        this.args = whole_args.yt_dlp;
        this.customArg = whole_args.custom;
        console.log(this.args.join(" "));
    }
    async multiProcess(
        args: string[],
        download: boolean,
        count: number = 0
    ): Promise<YTDlpEventEmitter[]> {
        const func_exec = download ? this.download : this.exec;
        if (count > this.use_multiproess) {
            const range =
                count - (count % this.process_queue) / this.process_queue;
            let cache: number = 0;
            const queue: YTDlpEventEmitter[] = [];
            for (
                let index: number = 1;
                index <= this.process_queue + 1 || index * range <= count;
                index++
            ) {
                queue.push(
                    func_exec([...args, "-I", `${cache + 1}:${index * range}`])
                );
                cache = index * range;
            }
            return queue;
        }
        return [func_exec(args)];
    }
    async analyze(): Promise<
        | void
        | [
              YTDlpEventEmitter[],
              {
                  title: string;
                  uploader: string;
                  thumbnail: string;
            },
              YTDlpEventEmitter[]?
          ]
        > {
        
        const info = await this.getInfo();
        if (typeof info._type == undefined) {
            return;
        }
        const playlist_count = info.playlist_count;
        if (info._type == "video") {
            return [[this.download(this.args)], info];
        } else {
            return [
                await this.multiProcess(this.args, true, playlist_count,),
                info,
                await this.multiProcess([...this.args,"-J"],false,playlist_count)
            ];
        }
    }
    download(args: string[]) {
        return this.exec(args);
    }
    private async getInfo() {
        return await this.getVideoInfo(this.url);
    }
    async printInfo() {
        //for testing of ytdl
        return await this.exec([...this.args, "-J", "-I", "1"]);
    }
}
