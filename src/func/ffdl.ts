import fs, { rmSync } from "fs";
import path from "path";
import AdmZip from "adm-zip";
import { dialog } from "electron";
export const ffdl = async (ffmpeg: boolean) => {
    if (ffmpeg || (await fs.existsSync(path.join(__dirname, "ffmepg.exe")))) {
            return
    } else {
        const msg = await dialog.showMessageBoxSync({
                type: "info",
                message: "Do you want to download FFmpeg?",
                detail: "FFmpeg was not found in the installed directroy.",
                buttons: ["Yes", "No"],
                defaultId: 0,
                cancelId: 1,
            });
        if (msg == 1)
            return
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
    if (!contentLength) return;
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
        process.stdout.write(
            `\r\x1b[0KDownloading... ${
                Math.round((loaded / total) * 10000) / 100
            }%`
        );
        if (responce?.done) break;
        stream.write(responce?.value);
    }
    stream.end();
    stream.close(async () => {
        console.log(stream.closed)
        console.log("\nDone");
        const zip = new AdmZip(temp_file);
        await zip.extractEntryTo(
            "ffmpeg-6.1.1-essentials_build/bin/ffmpeg.exe",
            __dirname,
            false,
            true
        );
        await rmSync(temp, { recursive: true, force: true });
    });
};