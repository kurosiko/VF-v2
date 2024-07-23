import YTDlpWrap from "./core";
import fs from "fs";
import path from "path";

export class yt_dlp extends YTDlpWrap {
    url: string;
    playlist_queue = 10;
    constructor(opts: string[]) {
        super(path.resolve("yt-dlp.exe"));
        this.url = opts[0];
    }
    async analyze() {
        const info = await this.getInfo();
        if (typeof info._type == undefined) {
            return
        }
        if (info._type == "video") {
            console.log("This is video");
        } else {
            const count = info.playlist_count
            const range = (count - count % this.playlist_queue) / this.playlist_queue
            const check = range*this.playlist_queue
            console.log(`count:${count}\nrange:${range}\ncheck:${check}`)
            let cache:number = 0
            if (count > 25) {
                for (let index: number = 1; index <= this.playlist_queue + 1 || index*range<=count; index++){
                    this.exec([
                        this.url,
                        "-I",
                        `${cache + 1}:${index * range}`,
                        "-o",
                        path.resolve(
                            "./testDL/%(playlist|)s/%(title)s.%(ext)s"
                        ),
                        "-i"
                    ]);
                    cache = index*range
                }
            } else {
                console.log("Reject")
            }
        }
    }
    download() {}
    downloadPlaylist() {
        
    }
    async getInfo() {
        return await this.getVideoInfo(this.url);
    }
}
const test = new yt_dlp(["https://www.youtube.com/watch?v=6JllTO5r7f0"]);
await test.analyze();
