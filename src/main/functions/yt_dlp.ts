import YTDlpWrap, { YTDlpEventEmitter } from "./core";
import path, { resolve } from "path";
import { Args } from "../../Types/yt_dlp.type";
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
        download: boolean,
        count: number = 0
    ): Promise<YTDlpEventEmitter[]> {
        if (count > this.use_multiproess) {
            const range =
                (count - (count % this.process_queue)) / this.process_queue;
            let cache: number = 0;
            const queue: YTDlpEventEmitter[] = [];
            console.log({
                total: count,
                range: range,
            });
            for (
                let index: number = 1;
                index <= this.process_queue+1 || index * range <= count;
                index++
            ) {
                console.log({
                    index: index,
                    cache: cache + 1,
                    range: `${cache + 1}:${index * range}`,
                });
                queue.push(
                    this.exec([
                        ...this.args,
                        "-I",
                        `${cache + 1}:${index * range}`,
                    ])
                );
                cache = index * range;
            }
            return queue;
        }
        return [this.exec(this.args)];
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
              any
          ]
    > {
        const info = await this.getInfo();
        if (typeof info._type == undefined) {
            return;
        }
        const playlist_count = info.playlist_count;
        const test = {};
        //not availible
        console.log({
            type: info._type,
            cout: info.playlist_count,
        });
        if (info._type == "video") {
            return [[this.download()], info, test];
        } else {
            return [await this.multiProcess(true, playlist_count), info, test];
        }
    }
    download() {
        return this.exec(this.args);
    }
    private async getInfo() {
        return await this.getVideoInfo(this.url);
    }
    async printInfo() {
        //for testing of ytdl
        return await this.exec([...this.args, "-J", "-I", "1"]);
    }
}

