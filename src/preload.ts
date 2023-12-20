import { error } from "console";
import { contextBridge, ipcRenderer } from "electron";
import { config } from "process";
import { JSONType } from "./JsonType";

contextBridge.exposeInMainWorld("api", {
    download: (url: string) => {
        ipcRenderer.invoke("download", url).catch((error) => {
            console.log(error);
        });
    },
    ReqPath: () => {
        ipcRenderer.invoke("getpath").catch((error) => {
            console.log(error);
        });
    },
    ResPath: (listener: Function) => {
        ipcRenderer.on("ResPath", (_, args) => {
            listener(args);
        });
    },
    ReqConfig: () => {
        ipcRenderer.invoke("ReqConfig").catch((error) => {
            console.log(error);
        });
    },
    ResConfig: (config: Function) => {
        ipcRenderer.on("ResConfig", (_, args) => {
            config(args);
        });
    },
    SaveConfig: (config: JSONType) => {
        ipcRenderer.invoke("save", config).catch((error) => {
            console.log(error);
        });
    },
    sendThumbnail: (thumbnail: Function) => {
        ipcRenderer.once("thumbnail", (_event, args) => {
            console.log(args);
            thumbnail(args);
        });
    },
    sendProgress: (progress: Function) => {
        ipcRenderer.on("progress", (_event, args) => {});
    },
});
