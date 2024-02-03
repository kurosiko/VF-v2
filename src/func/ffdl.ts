import { execSync } from "child_process";
import { copyFileSync, createWriteStream, existsSync, mkdirSync, readdirSync, statSync } from "fs";
import path from "path";
import { Readable, finished } from "stream";
import { promisify } from "util";

export const ffdl = async () => {
    const temp = path.resolve("./temp");
    const temp_file = path.join(temp, "temp.zip")
    if (!existsSync(temp)) mkdirSync(temp);
    const res = await fetch(
        "https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip"
    );
    const stream = createWriteStream(temp_file);
    const readable = Readable.fromWeb(res.body as ReadableStream<Uint8Array>);
    readable.pipe(stream);
    const finishedAsync = promisify(finished);
    await finishedAsync(readable);
    await execSync(`unzip -o ${temp_file} -d ${temp}`)
    const dirList = readdirSync(temp).filter(item => {
        return statSync(path.join(temp,item)).isDirectory()
    })
    await execSync(
        `copy /y ${path.join(temp, dirList[0], "bin", "ffmpeg.exe")} ${path.resolve(".")}`
    );
    await execSync(
        `rmdir /q /s ${temp}`
    )
};
