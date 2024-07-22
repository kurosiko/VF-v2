import { atom } from "recoil";
import { JSONType } from "../../VFTypes";
import { JSONType } from "../../VFTypes";
import { Progress } from "../../Progress";
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
                default: "null",
            },
            qualityList: {
                null: "null",
            },
            codecList: {
                null: "null",
            },
            defaultList: {
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
                default: "null",
            },
            qualityList: {
                null: "null",
            },
            codecList: {
                null: "null",
            },
            defaultList: {
                null: "null",
            },
        },
        other: {
            notification: false,
            update: false,
            dev: true,
        },
        custom: {
            lyric: false,
            ytmImage: false,
        },
        ytdlp_v: "null",
        ffmpeg: false,
    },
});
export const PROGRESS = atom<Progress[]>({
    key: "progress",
    default: [],
});
