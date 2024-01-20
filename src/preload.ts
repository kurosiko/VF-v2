import { error } from "console";
import { contextBridge, ipcRenderer } from "electron";
import { config, removeAllListeners } from "process";
import { JSONType } from "./JsonType";

contextBridge.exposeInMainWorld("api", {
    download: (opts: string[]) => {
        ipcRenderer.invoke("download", opts).catch((error) => {
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
        ipcRenderer.removeAllListeners("ResConfig");
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
            console.log(error);
        });
    },
    SaveConfig: (config: JSONType) => {
        ipcRenderer.invoke("save", config).catch((error) => {
            console.log(error);
        });
    },
    ReceiveBase: (f: Function) => {
        ipcRenderer.on("sendBase", (_, base_data) => {
            f(base_data);
        });
    },
    Kill: (f: Function) => {
        ipcRenderer.on("close", (_, pid) => {
            f(pid)
        })
    }
});
