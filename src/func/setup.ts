import path from "path";
import YTDlpWrap from "./dlp";
import { existsSync } from "fs";
export const setup = async (ytdlp_v: string) => {
    const Path_yt = path.resolve("yt-dlp.exe");
    const exist = existsSync(Path_yt)
    const version = (await YTDlpWrap.getGithubReleases(1, 1))[0].tag_name
    console.log(`yt-dlp:[exist:${exist},version:${version}]`);
    if (!exist || (version != ytdlp_v)) {
        await YTDlpWrap.downloadFromGithub(Path_yt).then(() => {
            console.log("downloaded latest yt-dlp")
        });
    }
    const ytdl = new YTDlpWrap(Path_yt);
    const current = (await ytdl.getVersion()).replace("\r\n","");
    console.log(`current:${current}`);
    return current
}
