import fs from "fs";
import path from "path";
import { JSONType } from "../JsonType";
const Default = {
    dir: "./",
    general: {
        dl: false,
        uploader: false,
        playlist: false,
    },
    video: {
        advance: false,
        thumbnail: false,
        metadata: false,
        quality: {
            highest: "bestvideo+bestaudio",
        },
        codec: {
            mp7: "OMG",
        },
    },
    audio: {
        advance: false,
        thumbnail: false,
        metadata: false,
        quality: {
            highest: "bestvideo+bestaudio",
        },
        codec: {},
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
