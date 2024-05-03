import path from "path";
import YTDlpWrap from "./core";
import YTMusic from "ytmusic-api";
const emitter = new YTDlpWrap(path.resolve("yt-dlp.exe"));
const info = await emitter.execPromise([
    "https://www.youtube.com/playlist?list=PL_TVAUxN75hTVoX_08S45DN7LwclSOz1P",
    "--get-id",
]);
const ids = info.split("\n").map((item) => {
    return item.replace(/\n/g, "");
});
console.log(ids);
const yt = new YTMusic();
await yt.initialize();
for (let i of ids) {
    if (!i) continue;
    console.log((await yt.getSong(i))["thumbnails"].at(-1)?.url);
}
