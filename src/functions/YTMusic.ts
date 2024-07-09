import YTMusic from "ytmusic-api";

const ytMusic = new YTMusic();
await ytMusic.initialize();
await ytMusic.getSong()