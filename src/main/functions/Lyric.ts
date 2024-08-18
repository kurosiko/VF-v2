import fs from "fs";

export const Lyric = async (title: string, artist: string) => {
    const url = `https://lyrics-api.boidu.dev//getLyrics?s=${title}\u0026a=${artist}`;
    const res = await fetch(encodeURI(url), {
        method: "GET",
    });
    console.log(res.status);
    if (res.statusText != "OK") {
        return new Error("Responce Error");
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
    fs.writeFileSync(`${title}.lrc`, text);
};
