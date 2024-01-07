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
                force: false,
                thumbnail: false,
                metadata: false,
            },
            string: {
                codec: "null",
                quality: "null",
            },
            qualityList: {
                null: "null",
            },
            codecList: {
                null: "null",
            },
        },
        audio: {
            boolean: {
                force: false,
                thumbnail: false,
                metadata: false,
            },
            string: {
                codec: "null",
                quality: "null",
            },
            qualityList: {
                null: "null",
            },
            codecList: {
                null: "null",
            }
        },
        other: {
            notification: false,
            update: false,
            dev: true,
        },
        ytdlp_v: "2023.12.30",
    },
});
