import path from "path";
import YTDlpWrap from "../functions/core";
import { existsSync } from "fs";
import { JSONType } from "../../Types/VFTypes";

export const setup = async (config: JSONType) => {
    const Path_yt = path.resolve("yt-dlp.exe");
    const exist = existsSync(Path_yt);
    const version = (await YTDlpWrap.getGithubReleases(1, 1))[0].tag_name;
    console.log(`yt-dlp:[exist:${exist},version:${version}]`);
    if (!exist || version != config.ytdlp_v)
        await YTDlpWrap.downloadFromGithub(Path_yt);
    console.log(`current:${version}`);
    config.ytdlp_v = version;
    return config;
};
