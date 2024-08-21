import { contextBridge, ipcRenderer, shell } from "electron";
const error_logger = (text: string) => {
    console.log(text);
};
import { Logger } from "./main/functions/Logger";
import { JSONType } from "./Types/VFTypes";
import { Download } from "./main/functions/download";
import { Progress } from "./Types/Progress";
import { removeAllListeners } from "process";

const ApiFunctions = {
    donwload: () => ipcRenderer.invoke("download"),
    path: () => ipcRenderer.invoke("path"),
    explorer: (path: string) => shell.showItemInFolder(path),
    config: () => ipcRenderer.invoke("config"),
    progress: (callback: (progress_data: Progress) => void) =>
        ipcRenderer.on("progress", (_event, data) => {
            ipcRenderer.removeAllListeners("progress");
            callback(data)
        }),
    close: (callback: (content_data: Progress) => void) =>
        ipcRenderer.on("close", (_event, data) => {
            ipcRenderer.removeAllListeners("close");
            callback(data);
        }),
    setup: (callback: (msg: string) => void) =>
        ipcRenderer.on("setup", (_event, msg) => {
            callback(msg);
            //if(!msg) removeAllListeners("setup")
        }),
    mainExit: (callback: () => JSONType) => {
        ipcRenderer.once("MainExit", (event) => {
            //removeAllListeners("setup");
            event.sender.invoke("MainExit", callback());
        });
    },
};
contextBridge.exposeInMainWorld("api", ApiFunctions);
