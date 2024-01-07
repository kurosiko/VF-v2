import YTDlpWrap from "./dlp";
import path from "path";
export const download = (opts: string[]) => {
    console.log(opts);
    const yt_dlp = new YTDlpWrap(path.resolve("yt-dlp.exe"));
    yt_dlp
        .exec(opts)
        .on("ytDlpEvent", (e) => {
            console.log(e);
        })
        .on("progress", (e) => {
            console.log(e);
        })
        .on("close", (e) => {
            console.log(e);
        });
};
