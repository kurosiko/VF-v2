import YTDlpWrap, { YTDlpEventEmitter } from "./core";
import path, { join, resolve } from "path";
import { Args } from "../../Types/yt_dlp.type";
export class yt_dlp extends YTDlpWrap {
    private url: string;
    private process_queue: number = 10;
    private use_multiproess: number = 20;
    customArg: Args["custom"];
    args: string[];
    constructor(whole_args: Args) {
        super(path.resolve("yt-dlp.exe"));
        this.url = whole_args.yt_dlp[0];
        this.args = whole_args.yt_dlp;
        this.customArg = whole_args.custom;
        console.log(this.args.join(" "));
    }
    async multiProcess(count: number = 0): Promise<YTDlpEventEmitter[]> {
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
                index <= this.process_queue + 1 || index * range <= count;
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
                  id: string[];
              },
              Args["custom"]
          ]
    > {
        const info_json = await this.getInfo();
        if (typeof info_json._type == undefined) {
            return;
        }
        console.log({
            type: info_json._type,
            cout: info_json.playlist_count,
        });
        const is_playlist = info_json._type == "playlist";
        const info = {
            title: info_json.title || "ERROR",
            uploader: info_json.uploader || "ERROR",
            thumbnail:
                info_json.thumbnail ||
                info_json.thumbnails[0].url ||
                "https://i.scdn.co/image/ab67616d00001e02e27ec71c111b88de91a51600",
            id: is_playlist
                ? Array.from(info_json.entries).map((item: any) => item.id)
                : [info_json.id],
        };
        if (is_playlist) {
            return [
                await this.multiProcess(info_json.playlist_count),
                info,
                this.customArg,
            ];
        } else {
            return [[this.download()], info, this.customArg];
        }
    }
    download() {
        return this.exec(this.args);
    }
    private async getInfo() {
        return await this.getVideoInfo(this.url);
    }
    async printInfo() {
        return await this.exec([...this.args, "-J", "-I", "1"]);
    }
}
