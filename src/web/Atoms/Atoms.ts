import { atom } from "recoil";
import { JSONType } from "../../JsonType";
export const CONFIG = atom<JSONType>({
    key: "config",
    default: {
        dir: "./",
        general: { dl: false, uploader: false, playlist: false },
        video: {
            advance: false,
            thumbnail: false,
            metadata: false,
            quality: { highest: "bestvideo+bestaudio" },
            codec: { mp7: "OMG" },
        },
        audio: {
            advance: false,
            thumbnail: false,
            metadata: false,
            quality: { highest: "bestvideo+bestaudio" },
            codec: {},
        },
        other: { notification: true, update: true, dev: false },
        ytdlp_v: "",
    },
});
