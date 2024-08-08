import { DL_Type, JSONType } from "./functions/VFTypes";
import { Progress } from "./functions/Progress";
import { Args } from "./functions/yt_dlp.type";
declare global {
    interface Window {
        api: AppAPI;
    }
}
export interface AppAPI {
    download: (options: Args) => void;
    path: () => Promise<string>;
    explorer: (path: string) => void;
    config: () => Promise<JSONType>;
    progress: (callback: (callback: Progress) => void) => void;
}
