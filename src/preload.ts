import { contextBridge, ipcRenderer, shell } from "electron";
const error_logger = (text: string) => {
    console.log(text);
};
import { Logger } from "./main/functions/Logger";
import { JSONType } from "./Types/VFTypes";
import { Download } from "./main/functions/download";
import { Progress } from "./Types/Progress";

const ApiFunctions = {
    donwload: () => ipcRenderer.invoke("download"),
    path: () => ipcRenderer.invoke("path"),
    explorer: (path: string) => shell.showItemInFolder(path),
    config: () => ipcRenderer.invoke("config"),
    progress: (callback: (progress_data: Progress) => void) =>
        ipcRenderer.on("progress", (_event, data) => callback(data)),
    close: (callback: (content_data: Progress) => void) =>
        ipcRenderer.on("close", (_event, data) => callback(data)),
    setup: (callback: (msg:string) => void) =>
        ipcRenderer.once("setup", (_event,msg) => callback(msg)),
};
contextBridge.exposeInMainWorld("api", ApiFunctions);
