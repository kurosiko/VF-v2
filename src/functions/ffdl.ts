import fs, { rmSync } from "fs";
import { dialog } from "electron";
import path from "path";
import AdmZip from "adm-zip";
export const ffdl = async (mainWindow: Electron.BrowserWindow) => {
    if (await fs.existsSync(path.resolve("./ffmpeg.exe"))) return true;
    const msg = dialog.showMessageBoxSync(mainWindow, {
        type: "info",
        title: "VideoFetcher",
        message: "Do you want to download FFmpeg?",
        detail: "FFmpeg was not found in the installed directroy.",
        buttons: ["Yes", "No"],
        defaultId: 0,
        cancelId: 1,
    });
    if (msg == 1) return true;
    mainWindow.webContents.executeJavaScript(
        "window.location.hash='#progress'"
    );
    console.log("[download ffmpeg]");
    const temp = path.resolve("./temp");
    console.log(temp);
    const temp_file = path.join(temp, "temp.zip");
    if (!fs.existsSync(temp)) fs.mkdirSync(temp);
    const res = await fetch(
        "https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip"
    );
    const contentLength = res.headers.get("content-length");
    if (!contentLength) return false;
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
        mainWindow.webContents.send("setup", percent);
        mainWindow.setProgressBar(percent / 100);
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
        await dialog.showMessageBoxSync(mainWindow, {
            type: "info",
            title: "VideoFetcher",
            message: "Finished downloading FFmpeg.exe",
            detail: "Enjoy VideoFetcher-v2!!",
        });
        await rmSync(temp, { recursive: true, force: true });
        mainWindow.setProgressBar(0);
    });
    return true;
};
