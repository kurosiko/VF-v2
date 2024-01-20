import { JSONType, Str_Dict } from "./JsonType";
import { Progress } from "./Progress";
declare global {
    interface Window {
        api: AppAPI;
    }
}
export interface AppAPI {
    download: (opts: string[]) => void;
    ReqPath: () => void;
    ResPath: (f: (path: string) => void) => void;
    ReqConfig: () => void;
    ResConfig: (f: (config: JSONType) => void) => void;
    SaveConfig: (config: JSONType) => void;
    ReqConfig_Save: (f: () => void) => void;
    ResConfig_Save: (config: JSONType) => void;
    ReceiveBase: (f: (base_data: Progress) => void) => void;
    Refresh: (f: (state: Progress) => void) => void;
    Kill: (f: (pid: number) => void) => void;
}
