import path from "path-browserify";
import { JSONType } from "../JsonType";
function dir(config: JSONType) {
    let output = config.dir;
    if (config.general.dl) output = path.join(output, "DL_Video");
    if (config.general.list) {
        if (config.general.playlist) {
            output = path.join(output, "%(playlist|)s");
        }
    } else {
        if (config.general.uploader) output = path.join(output, "%(uploader)s");
    }
    output = path.join(output, "%(title)s.%(ext)s");
    return output;
}
function format(config: JSONType) {
    let preset = [];
    if (config.general.only) {
        preset.push(config.audio.string.quality);
        if (config.audio.boolean.force) preset.push("-x");
        preset.push("--audio-format", config.audio.string.codec);
    } else {
        preset.push(config.video.string.quality);
        if (config.video.boolean.force)
            preset.push("--merge-output-format", config.video.string.codec);
    }
    if (!config.general.list) preset.push("--no-playlist");
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
function can_embed(codec: string) {
    return ![
        "mp3",
        "mkv",
        "mka",
        "ogg",
        "opus",
        "flac",
        "m4a",
        "mp4",
        "m4v",
        "mov",
    ].includes(codec);
}
export const Gen_opts = (url: string, config: JSONType) => {
    const opts = [
        url,
        ...["-o", `${dir(config)}`],
        ...["-f", ...format(config)],
        ...embed(config),
        "-i",
        "--no-post-overwrites",
    ];
    return opts;
};
