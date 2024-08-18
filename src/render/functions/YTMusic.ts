import YTMusic from "ytmusic-api";
import fs from "fs";
import imageSize from "image-size";
//Media dataを渡す
export class YTM extends YTMusic {
    title = "";
    artist = "";
    id = "";
    constructor() {
        super();
        this.initialize();
    }
    async Info_Json() {}
    async Lyric() {
        const url = `https://lyrics-api.boidu.dev//getLyrics?s=${this.title}\u0026a=${this.artist}`;
        const res = await fetch(encodeURI(url), { method: "GET" });
        if (res.status != 200) {
            return new Error("Fetch Error");
        }
        const json = await res.json();
        if (json.error != null) {
            return new Error("API Error");
        }
        const msToTime = (ms: number) => {
            const Ms = ms % 1000;
            const Sec = Math.floor(ms / 1000) % 60;
            const Min = Math.floor(ms / 1000 / 60) % 60;
            return `[${getTwoDigits(Min)}:${getTwoDigits(Sec)}.${getTwoDigits(
                Ms
            )}]`;
        };
        const getTwoDigits = (num: number) => {
            const number = num.toString();
            return ("0" + number).slice(-2);
        };
        let lyric_list = [];
        for (const lyric of json.lyrics) {
            lyric_list.push(
                [`${msToTime(lyric.startTimeMs)}`, lyric.words].join(" ")
            );
        }
        const text = lyric_list.join("\n");
        fs.writeFileSync(`${this.title}.lrc`, text);
    }
    async getThumbnail(id:string) {
        const json_data = await this.getSong(id);
        const image_url = json_data["thumbnails"].at(-1)?.url;
        if (!image_url) return;
        const image_data = imageSize(
            new Uint8Array(
                await (await (await fetch(image_url)).blob()).arrayBuffer()
            )
        );
        if (!(image_data.height == image_data.width)) return;
        return image_url;
    }
}
