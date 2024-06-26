import path from "path-browserify";
import { JSONType } from "../VFTypes";
/*
const dir = (config: JSONType) => {
    let output = config.dir;
    if (config.general.dl) output = path.join(output, "DL_Video");
    output = path.join(
        output,
        config.general.playlist && config.general.list
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
            preset.push("-x", `--audio-format`, audioCodec);
    } else {
        const videoQuality = config.video.string.quality;
        const videoDefault = config.video.string.default;
        const videoCodec = config.video.string.codec;
        preset.push(
            videoDefault ? `${videoQuality}/${videoDefault}/b` : videoQuality
        );
        if (config.video.boolean.force)
            preset.push("--merge-output-format", videoCodec);
    }
    if (!config.general.list) preset.push("--no-playlist");
    console.log(preset);
    return preset;
};
*/
const genOutput = (config: JSONType) => {
    const baseDir = config.dir;
    const subDir = config.general.dl ? "DL_Video" : "";
    const playlistDir =
        config.general.playlist && config.general.list ? "%(playlist|)s" : "";
    const uploaderDir = config.general.uploader ? "%(uploader)s" : "";
    return path.join(
        baseDir,
        subDir,
        playlistDir,
        uploaderDir,
        "%(title)s.%(ext)s"
    );
};
const genFormat = (config: JSONType) => {
    const getFromList = (type: "audio" | "video") =>
        config[type].defaultList[config[type].string.default]
            ? `${config[type].qualityList[config[type].string.quality]}/${
                  config[type].defaultList[config[type].string.default]
              }`
            : config[type].defaultList[config[type].string.quality];
    const getForce = (type: "audio" | "video") => config[type].boolean.force;
    const getFormat = (type: "audio" | "video") =>
        config[type].codecList[config[type].string.codec];
    let preset: string[] = [];
    if (config.general.only) {
        preset.push(getFromList("audio"));
        if (getForce("audio")) {
            preset.push("-x", "--audio-format", getFormat("audio"));
        }
    } else {
        preset.push(getFromList("video"));
        if (getForce("video")) {
            preset.push("--merge-output-format", getFormat("video"));
        }
    }
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
        genOutput(config),
        "-f",
        ...genFormat(config),
        ...embed(config),
        "-i",
        "--no-post-overwrites",
    ];
};
