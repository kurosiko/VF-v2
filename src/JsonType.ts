export interface JSONType {
    ytdlp_v?: string;
    dir?: string;
    general?: Boolen_Dict;
    video?: Media;
    audio?: Media;
    other?: Boolen_Dict;
}
interface Media {
    thumbnail: boolean;
    metadata: boolean;
    advance: boolean;
    quality: Str_Dict;
    codec: Str_Dict;
}
export interface Boolen_Dict {
    [key: string]: boolean;
}
export interface Str_Dict {
    [key: string]: string;
}
