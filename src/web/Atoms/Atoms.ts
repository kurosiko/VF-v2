import { atom } from "recoil";
import { JSONType } from "../../JsonType";
export const CONFIG = atom<JSONType>({
    key: "config",
    default: {
        dir: "./",
        general: {
            dl: false,
            uploader: false,
            playlist: false,
            only: false,
            list: false,
        },
        video: {
            boolean: {
                force: true,
                thumbnail: true,
                metadata: false,
            },
            string: {
                codec: "mp4",
                quality: "GOOD!",
            },
            qualityList: {
                highest: "bestvideo+bestaudio",
                test: "",
                test2: "",
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
                codec: "mp4",
                quality: "GOOD!",
            },
            qualityList: {
                highest: "bestvideo+bestaudio",
                test: "",
                test2: "",
            },
            codecList: {
                mp7: "OMG",
                mp6: "OMG",
                mp5: "OMG",
            },
        },
        other: {
            notification: true,
            update: true,
            dev: false,
        },
        ytdlp_v: "2023.12.30",
    }
});
