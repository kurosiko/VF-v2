export interface JSONType {
    ytdlp_v: string;
    dir: string;
    general: Boolen_Dict;
    video: Media;
    audio: Media;
    other: Boolen_Dict;
}
interface Media {
    boolean: Boolen_Dict;
    string: Str_Dict;
    qualityList: Str_Dict;
    codecList: Str_Dict;
    defaultList: Str_Dict;
}
export interface Boolen_Dict {
    [key: string]: boolean;
}
export interface Str_Dict {
    [key: string]: string;
}
