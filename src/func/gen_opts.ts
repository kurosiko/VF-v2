import path from "path-browserify";
import { JSONType } from "../JsonType";
const dir = (config: JSONType) => {
    let output = config.dir;
    if (config.general.dl) output = path.join(output, "DL_Video");
    output = path.join(
        output,
        config.general.playlist
            ? "%(playlist|)s"
            : config.general.uploader
            ? "%(uploader)s"
            : "",
        "%(title)s.%(ext)s"
    );
    return output;
};
const format = (config: JSONType) => {
    let preset = [];
    if (config.general.only) {
        const audioQuality =
            config.audio.qualityList[config.audio.string.quality];
        const audioDefault =
            config.audio.defaultList[config.audio.string.default];
        const audioCodec = config.audio.codecList[config.audio.string.codec];
        preset.push(
            audioDefault ? `${audioQuality}/${audioDefault}` : audioQuality
        );
        if (config.audio.boolean.force)
            preset.concat(["-x", `--audio-format`, audioCodec]);
    } else {
        const videoQuality =
            config.video.qualityList[config.video.string.quality];
        const videoDefault =
            config.video.defaultList[config.video.string.default];
        const videoCodec = config.video.codecList[config.video.string.codec];
        preset.push(
            videoDefault ? `${videoQuality}/${videoDefault}` : videoQuality
        );
        if (config.video.boolean.force)
            preset.concat(["--merge-output-format", videoCodec]);
    }
    if (!config.general.list) preset.push("--no-playlist");
    return preset;
};
const embed = (config: JSONType) => {
    let option = [];
    if (config.general.only) {
        if (config.audio.boolean.metadata) option.push("--embed-metadata");
        if (config.audio.boolean.thumbnail) option.push("--embed-thumbnail");
    } else {
        if (config.video.boolean.metadata) option.push("--embed-metadata");
        if (config.video.boolean.thumbnail) option.push("--embed-thumbnail");
    }
    return option;
};
export const Gen_opts = (url: string, config: JSONType) => {
    return [
        url,
        "-o",
        dir(config),
        "-f",
        ...format(config),
        ...embed(config),
        "-i",
        "--no-post-overwrites",
    ];
};
