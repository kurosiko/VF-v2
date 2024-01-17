import { atom } from "recoil";
import { JSONType } from "../../JsonType";
import { Queue } from "../../Queue";
export const CONFIG = atom<JSONType>({
    key: "config",
    default: {
        dir: "null",
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
export const PROGRESS = atom<Queue[]>(
    {
        key: "progress",
        default: []
    }
)