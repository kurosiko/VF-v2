import { contextBridge, ipcRenderer, shell } from "electron";
const error_logger = (text: string) => {
    console.log(text);
};
import { Logger } from "./functions/Logger";
import { JSONType } from "./functions/VFTypes";
import { Download } from "./functions/download";
import { Progress } from "./functions/Progress";

const ApiFunctions = {
    donwload: () => ipcRenderer.invoke("download"),
    path: () => ipcRenderer.invoke("path"),
    explorer: (path: string) => shell.showItemInFolder(path),
    config: () => ipcRenderer.invoke("config"),
    progress: (callback:(callback:Progress) =>{})=>ipcRenderer.on("progress",(_event,callback))
};
contextBridge.exposeInMainWorld("api", ApiFunctions);

