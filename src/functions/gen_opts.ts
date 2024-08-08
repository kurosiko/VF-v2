import path from "path-browserify";
import { JSONType } from "./VFTypes";
interface Config_Type {
    genOutput: () => string;
    genFormat: () => string[];
    embed: () => string[];
    custom: () => { [key: string]: boolean };
}
export class Config implements Config_Type {
    config: JSONType;
    url: string;
    constructor(url: string, config: JSONType) {
        this.config = config;
        this.url = url;
    }
    genOutput() {
        const baseDir = this.config.dir;
        const subDir = this.config.general.dl ? "DL_Video" : "";
        const playlistDir =
            this.config.general.playlist && this.config.general.list
                ? "%(playlist|)s"
                : "";
        const uploaderDir = this.config.general.uploader ? "%(uploader)s" : "";
        return path.join(
            baseDir,
            subDir,
            playlistDir,
            uploaderDir,
            "%(title)s.%(ext)s"
        );
    }
    genFormat() {
        const getFromList = (type: "audio" | "video") => {
            const default_val =
                this.config[type].defaultList[this.config[type].string.default];
            const quality_val =
                this.config[type].qualityList[this.config[type].string.quality];
            if (default_val) return `${quality_val}/${default_val}`;
            else if (quality_val) return quality_val;
            else return "";
        };
        const getForce = (type: "audio" | "video") =>
            this.config[type].boolean.force;
        const getFormat = (type: "audio" | "video") =>
            this.config[type].codecList[this.config[type].string.codec];
        let preset: string[] = [];
        if (this.config.general.only) {
            preset.push(getFromList("audio"));
            if (getForce("audio")) {
                preset.push("-x", "--audio-format", getFormat("audio"));
            }
            preset.push("audio");
        } else {
            preset.push(getFromList("video"));
            if (getForce("video")) {
                preset.push("--merge-output-format", getFormat("video"));
            }
        }
        return preset;
    }
    embed() {
        let option: string[] = [];
        if (this.config.general.only) {
            if (this.config.audio.boolean.metadata)
                option.push("--embed-metadata");
            if (this.config.audio.boolean.thumbnail)
                option.push("--embed-thumbnail");
        } else {
            if (this.config.video.boolean.metadata)
                option.push("--embed-metadata");
            if (this.config.video.boolean.thumbnail)
                option.push("--embed-thumbnail");
        }
        if (!this.config.general.list) option.push("--no-playlist");
        return option;
    }
    custom() {
        return {
            lyric: this.config.custom.lyric,
            ytmImage: this.config.custom.ytmImage,
            multiProcess: this.config.custom.multiProcess,
        };
    }
    Gen_opts() {
        return {
            yt_dlp: [
                this.url,
                "-i",
                "--no-post-overwrites",
                "--no-warn",
                ...this.embed(),
                "-o",
                this.genOutput(),
                "-f",
                ...this.genFormat(),
            ],
            custom: this.custom(),
        };
    }
}
