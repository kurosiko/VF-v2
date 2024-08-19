import { atom, useRecoilState } from "recoil";
import { JSONType } from "../../../Types/VFTypes";
import { Progress } from "../../../Types/Progress";
import { produce } from "immer";
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
                codecList: "null",
                qualityList: "null",
                defaultList: "null",
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
                codecList: "null",
                qualityList: "null",
                defaultList: "null",
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
export const test = atom<number>({
    key: "test",
    default: 0,
});
