import { JSONType, Str_Dict } from "./JsonType";
declare global {
    interface Window {
        api: AppAPI;
    }
}
export interface AppAPI {
    download:(url:string)=>void;
    getpath:()=>void;
    sendpath:(listener:(path:string)=>void)=>void;
    ReqConfig:()=>void;
    ResConfig:(func:(config:JSONType)=>void)=>void;
    SaveConfig:(config:JSONType)=>void;
    sendThumbnail:(sender:(url:Str_Dict)=>void)=>void;
}