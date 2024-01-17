import { error } from "console";
import { contextBridge, ipcRenderer } from "electron";
import { config } from "process";
import { JSONType } from "./JsonType";

contextBridge.exposeInMainWorld("api", {
    download: (opts: string[]) => {
        ipcRenderer.invoke("download",opts).catch((error) => {
            console.log(error);
        });
    },
    ReqPath: () => {
        ipcRenderer.invoke("ReqPath").catch((error) => {
            console.log(error);
        });
    },
    ResPath: (listener: Function) => {
        ipcRenderer.on("ResPath", (_, args) => {
            if (args) {
                listener(args[0]);
            }
        });
    },
    ReqConfig: () => {
        ipcRenderer.invoke("ReqConfig").catch((error) => {
            console.log(error);
        });
    },
    ResConfig: (config: Function) => {
        ipcRenderer.removeAllListeners("ResConfig")
        ipcRenderer.once("ResConfig", (_, args) => {
            config(args);
        });
    },
    ReqConfig_Save: (sendConfig: Function) => {
        ipcRenderer.removeAllListeners("ReqConfig_Save");
        ipcRenderer.once("ReqConfig_Save", (_) => {
            sendConfig();
        });
    },
    ResConfig_Save: (config: JSONType) => {
        ipcRenderer.invoke("ResConfig_Save", config).catch((error) => {
            console.log(error)
        })
    }
    ,
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
    ResProgress: (progress: Function) => {
        ipcRenderer.on("progress", (_event, args) => {
            progress(args)
        });
    },
    ReciveProgress: () => {
        
    }
});
