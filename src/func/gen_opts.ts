import path from "path-browserify"
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
export const Gen_opts = (url: string, config: JSONType) => {
    const opts = [
        url,
        ...["-o", `${dir(config)}`],
        ...["-f", ...format(config)],
        ...embed(config),
    ];
    return opts;
};
