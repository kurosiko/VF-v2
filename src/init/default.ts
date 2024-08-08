import path from "path";
import os from "os";
import { JSONType, WinState } from "../functions/VFTypes";
export const def_cfg: JSONType = {
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
            default: "ba_bv",
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
    custom: {
        lyric: false,
        ytmImage: false,
        multiProcess: false,
    },
    ytdlp_v: "null",
    ffmpeg: false,
};

export const def_win: WinState = {
    width: 550,
    height: 550,
    x: 50,
    y: 50,
};
export const def_path = {
    config: "config/config.json",
    window: "config/window.json",
    log: "log",
};
