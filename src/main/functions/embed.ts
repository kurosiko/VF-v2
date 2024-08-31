import { execSync } from "child_process";
import fs from "fs";
import path from "path";
//for mp3 m4a flac ogg
export const embed = (input: string, image: string) => {
    let preset = [
        "ffmpeg.exe",
        "-i",
        `"${input}"`,
        "-i",
        `"${image}"`,
        "-y",
        "-map",
        "0:a",
        "-map",
        "1:v",
    ];
    const exts = path.extname(input);
    const temp = `${path.dirname(input)}\\${path
        .basename(input)
        .split(".")
        .slice(0, -1)}_temp${exts}`;
    if (exts == ".mp3") {
        preset.push(
            "-write_id3v1",
            "1",
            "-id3v2_version",
            "3",
            "-metadata:s:v",
            'title="Album cover"',
            "-metadata:s:v",
            'comment="Cover (front)"'
        );
    } else {
        switch (exts) {
            case ".m4a":
                preset.push("-c:v", "copy", "-c:a", "copy");
                break;
            case ".ogg":
                preset.push("-c:a", "copy");
                break;
            case ".flac":
                break;
            default:
                console.log("!Format Not Supported!");
                return;
        }
        preset.push("-disposition:1", "attached_pic");
    }
    preset.push(`"${temp}"`);
    execSync(preset.join(" "));
    fs.rmSync(input);
    fs.renameSync(temp, input);
    return;
};
