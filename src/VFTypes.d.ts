export type JSONType = {
    ytdlp_v: string;
    ffmpeg: boolean;
    dir: string;
    general: Boolen_Dict;
    video: Media;
    audio: Media;
    other: Boolen_Dict;
};
export type Media = {
    boolean: Boolen_Dict;
    string: Str_Dict;
    qualityList: Str_Dict;
    codecList: Str_Dict;
    defaultList: Str_Dict;
};
export type Boolen_Dict = {
    [key: string]: boolean;
};
export type Str_Dict = {
    [key: string]: string;
};
export type WinState = {
    height: number;
    width: number;
    x: number;
    y: number;
};

