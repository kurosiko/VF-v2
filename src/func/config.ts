import fs from "fs";
import path from "path";
import os from "os";
import { JSONType } from "../JsonType";
const Default = {
    dir: path.join(os.homedir(), "Desktop"),
    general: {
        dl: true,
        uploader: true,
        playlist: true,
        only: false,
        list: false,
    },
    video: {
        boolean: {
            force: true,
            thumbnail: true,
            metadata: true,
        },
        string: {
            codec: "mp4",
            quality: "highest",
            default: "ba+bv",
        },
        qualityList: {
            highest: "bestvideo+bestaudio",
            NoAudio: "bestvideo",
        },
        codecList: {
            mp4: "mp4",
            mkv: "mkv",
            mov: "mov",
            webm: "webm",
            flv: "flv",
            avi: "avi",
        },
        defaultList: {
            error: "",
            ba_bv: "ba+bv",
            best: "best",
        },
    },
    audio: {
        boolean: {
            force: true,
            thumbnail: false,
            metadata: false,
        },
        string: {
            codec: "mp3",
            quality: "highest",
            default: "ba",
        },
        qualityList: {
            highest: "bestaudio",
        },
        codecList: {
            mp3: "mp3",
            acc: "acc",
            vorbis: "vorbis",
            m4a: "m4a",
            opus: "opus",
            wav: "wav",
        },
        defaultList: {
            error: "",
            ba: "ba",
            best: "best",
        },
    },
    other: {
        notification: true,
        update: true,
        dev: false,
    },
    ytdlp_v: "null",
};
export const load = () => {
    const JsonPath = path.resolve("./config/config.json");
    if (!fs.existsSync(JsonPath)) {
        console.log("Log not found");
        if (!fs.existsSync(path.dirname(JsonPath))) fs.mkdirSync("config");
        fs.writeFileSync(JsonPath, JSON.stringify(Default, null, 4), "utf-8");
    }
    return JSON.parse(fs.readFileSync(JsonPath, "utf-8"));
};
export const save = (config: JSONType) => {
    fs.writeFileSync(
        path.resolve("./config/config.json"),
        JSON.stringify(config, null, 4),
        "utf-8"
    );
};
