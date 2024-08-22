import { contextBridge, ipcRenderer, shell } from "electron";
import { Progress } from "./Types/Progress";
import { JSONType } from "./Types/VFTypes";
import { Args } from "./Types/yt_dlp.type";

const ApiFunctions = {
    donwload: (whole_arg:Args) => ipcRenderer.invoke("download",whole_arg),
    path: () => ipcRenderer.invoke("path"),
    explorer: (path: string) => shell.showItemInFolder(path),
    config: () => ipcRenderer.invoke("config"),
    progress: (callback: (progress_data: Progress) => void) => {
        ipcRenderer.removeAllListeners("progress");
        ipcRenderer.once("progress", (_event, data) => {
            callback(data);
        });
    },

    close: (callback: (pid: number) => void) => {
        ipcRenderer.removeAllListeners("close");
        ipcRenderer.once("close", (_event, pid) => {
            callback(pid);
        });
    },
    error: (callback: (pid: number) => void) => {
        ipcRenderer.removeAllListeners("error");
        ipcRenderer.once("error", (_event, pid) => {
            callback(pid);
        });
    },
    setup: (callback: (msg: string) => void) => {
        ipcRenderer.removeAllListeners("setup");
        ipcRenderer.on("setup", (_event, msg) => {
            callback(msg);
        });
    },
    mainExit: (callback: () => void) => {
        ipcRenderer.once("MainExit", (event) => {
            ipcRenderer.removeAllListeners("MainExit");
            callback()
        });
    },
    renderExit: (config: JSONType) => {
        ipcRenderer.invoke("MainExit",config)
    }
};
contextBridge.exposeInMainWorld("api", ApiFunctions);
