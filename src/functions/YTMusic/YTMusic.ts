import YTMusic from "ytmusic-api";
import fs from "fs"
//Media dataを渡す
class YTM extends YTMusic{
    title = ""
    artist = ""
    url = ""
    constructor(data: any) {
        super();
        this.initialize()
        
    }
    getThumbnail() {
        this.getSong(this.url)
    }
    async Info_Json() {
        
    }
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
}
