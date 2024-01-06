import fs from "fs";
import path from "path";
import { JSONType } from "../JsonType";
const Default = {
    dir: "./",
    general: {
        dl: true,
        uploader: true,
        playlist: true,
        only: true,
        list: true,
    },
    video: {
        boolean: {
            force: true,
            thumbnail: true,
            metadata: true,
        },
        string: {
            codec: "mp4",
            quality: "bv+ba",
        },
        qualityList: {
            highest: "bestvideo+bestaudio",
            NoAudio: "bestvideo",
        },
        codecList: {
            Auto: "",
            mp4: "",
            "You can add codecs from config.json": "",
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
            quality: "ba",
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
    },
    other: {
        notification: true,
        update: true,
        dev: false,
    },
    ytdlp_v: "",
};
export const load = () => {
    const JsonPath = path.resolve("./config/config.json");
    if (!fs.existsSync(JsonPath)) {
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
