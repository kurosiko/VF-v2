import AdmZip from "adm-zip";
import fs from "fs";
import path from "path";
import { JSONType } from "../../Types/VFTypes";
export const ffdl = async (config: JSONType) => {
    if (await fs.existsSync(path.resolve("./ffmpeg.exe"))) {
        config.ffmpeg = true;
        return config;
    }
    console.log("[download ffmpeg]");
    const temp = path.resolve("./temp");
    console.log(temp);
    const temp_file = path.join(temp, "temp.zip");
    if (!fs.existsSync(temp)) fs.mkdirSync(temp);
    const res = await fetch(
        "https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip"
    );
    const contentLength = res.headers.get("content-length");
    if (!contentLength) {
        config.ffmpeg = false;
        return config;
    }
    const total = parseInt(contentLength, 10);
    let loaded = 0;
    let done = false;
    const stream = fs.createWriteStream(temp_file, {
        autoClose: true,
        encoding: "utf-8",
    });
    const reader = await res.body?.getReader();
    while (!done) {
        const responce = await reader?.read();
        loaded += responce?.value?.byteLength || 0;
        const percent = Math.round((loaded / total) * 10000) / 100;
        process.stdout.write(`\r\x1b[0KDownloading... ${percent}%`);
        if (responce?.done) break;
        stream.write(responce?.value);
    }
    stream.end();
    stream.close(async () => {
        console.log(stream.closed);
        console.log("\nDone");
        const zip = new AdmZip(temp_file);
        zip.extractEntryTo(
            `${zip.getEntries()[0].entryName.split("/")[0]}/bin/ffmpeg.exe`,
            path.resolve("./"),
            false,
            true
        );
    });
    config.ffmpeg = true;
    return config;
};
