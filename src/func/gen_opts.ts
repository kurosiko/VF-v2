import path from "path";
import { JSONType } from "../JsonType";
function dir(config: JSONType) {
    let output = config.dir;
    if (config.general.dl) output = path.join(output, "DL_Video");
    if (config.general.list) {
        output = path.join(output, "%(playlist|)s");
    } else {
        if (config.general.uploader) output = path.join(output, "%(uploader)s");
    }
    output = path.join(output, "%(title)s.%(ext)s");
    return output;
}
function format(config: JSONType) {
    let preset = [config.video.string.quality];
    if (config.general.only) {
        preset.push("-x");
        if (config.audio.boolean.force)
            preset.push("--audio-format", config.audio.string.codec);
    } else {
        if (config.video.boolean.force)
            preset.push("--merge-output-format", config.video.string.codec);
    }
    return preset;
}
function embed(config: JSONType) {
    let option = [];
    if (config.general.only) {
        if (config.audio.boolean.metadata) option.push("--embed-metadata");
        if (config.audio.boolean.thumbnail) option.push("--embed-thumbnail");
    } else {
        if (config.video.boolean.metadata) option.push("--embed-metadata");
        if (config.video.boolean.thumbnail) option.push("--embed-thumbnail");
    }
    return option;
}
export const Gen_opts = (config: JSONType) => {
    const url =
        "https://www.youtube.com/watch?v=4KDUn3y3Sfw&list=RD4KDUn3y3Sfw";
    const opts = [
        url,
        ...["-o", `${dir(config)}`],
        ...["-f", ...format(config)],
        ...embed(config),
    ];
    console.log(opts);
};

Gen_opts({
    dir: "./TestDir",
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
    ytdlp_v: "2023.12.30",
});
