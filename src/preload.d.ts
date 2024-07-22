import { DL_Type, JSONType } from "./VFTypes";
import { Progress } from "./Progress";
declare global {
    interface Window {
        api: AppAPI;
    }
}
export interface AppAPI {
    download: (opts: DL_Type) => void;
    ReqPath: () => void;
    ResPath: (f: (path: string) => void) => void;
    ReqConfig: () => void;
    ResConfig: (f: (config: JSONType) => void) => void;
    SaveConfig: (config: JSONType) => void;
    Exit_Req: (f: () => void) => void;
    Exit_Res: (config: JSONType) => void;
    Exit_Req: (f: () => void) => void;
    Exit_Res: (config: JSONType) => void;
    ReceiveBase: (f: (base_data: Progress) => void) => void;
    Refresh: (f: (state: Progress) => void) => void;
    Kill: (f: (pid: number) => void) => void;
    Open_dir: (path: string) => void;
    Progress: (f: (percent: number) => void) => void;
    AddConfig: (
        f: (
            add_obj: {},
            target: "audio" | "video",
            list: "codecList" | "qualityList" | "defaultList",
            add: boolean
        ) => void
    ) => void;
    ReqAddConfig: (
        add_obj: {},
        target: "audio" | "video",
        list: "codecList" | "qualityList" | "defaultList",
        add: boolean
    ) => void;
    Open_dir: (path: string) => void;
    Progress: (f: (percent: number) => void) => void;
    AddConfig: (
        f: (
            add_obj: {},
            target: "audio" | "video",
            list: "codecList" | "qualityList" | "defaultList",
            add: boolean
        ) => void
    ) => void;
    ReqAddConfig: (
        add_obj: {},
        target: "audio" | "video",
        list: "codecList" | "qualityList" | "defaultList",
        add: boolean
    ) => void;
}
