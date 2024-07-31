type Args = {
    yt_dlp: string[];
    custom: custom;
} & Object;
type custom = {
    lyric: boolean;
    ytmImage: boolean;
} & object;
export { Args };
