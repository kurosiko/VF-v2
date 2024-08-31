export type JSONType = {
    dir: string;
    general: {
        dl: boolean;
        uploader: boolean;
        playlist: boolean;
        only: boolean;
        list: boolean;
    };
    video: Media;
    audio: Media;
    custom: {
        lyric: boolean;
        ytmImage: boolean;
        multiprocess: {
            multiprocess: boolean;
            use_limit_until: number;
            process_queue: number;
        };
    };
    other: {
        notification: boolean;
        update: boolean;
        dev: boolean;
    };
    ytdlp_v: string;
    ffmpeg: boolean;
};
export type Media = {
    boolean: {
        force: boolean;
        thumbnail: boolean;
        metadata: boolean;
    };
    string: {
        codecList: string;
        qualityList: string;
        defaultList: string;
    };
    qualityList: Str_Dict;
    codecList: Str_Dict;
    defaultList: Str_Dict;
};
export type WinState = {
    height: number;
    width: number;
    x: number;
    y: number;
};
export type Boolen_Dict = {
    [key: string]: boolean;
};
export type Str_Dict = {
    [key: string]: string;
};

export type DL_Type = {
    yt_dlp: string[];
    custom: { [key: string]: boolean };
};
