import { DL_Type, JSONType } from "./Types/VFTypes";
import { Progress } from "./Types/Progress";
import { Args } from "./Types/yt_dlp.type";
declare global {
    interface Window {
        api: AppAPI;
    }
}
export interface AppAPI {
    download: (options: Args) => void;
    path: () => Promise<string[]>;
    explorer: (path: string) => void;
    config: () => Promise<JSONType>;
    setup: (callback: (msg: string) => void) => void;
    mainExit: (callbakc: () => void) => void;
    renderExit: (config: JSONType) => void;
    progress: (callback: (callback: Progress) => void) => void;
    close: (callback: (pid: number) => void) => void;
    error: (callback: (pid: number) => void) => void;
}
