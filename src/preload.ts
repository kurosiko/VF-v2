import { contextBridge, ipcRenderer } from "electron";
import { JSONType } from "./JsonType";
const error_logger = (text: string) => {
    console.log(text);
};
contextBridge.exposeInMainWorld("api", {
    download: (opts: string[]) => {
        ipcRenderer.invoke("download", opts).catch(error_logger);
    },
    ReqPath: () => {
        ipcRenderer.invoke("ReqPath").catch(error_logger);
    },
    ResPath: (listener: Function) => {
        ipcRenderer.on("ResPath", (_, args) => {
            if (args) {
                listener(args[0]);
            }
        });
    },
    ReqConfig: () => {
        ipcRenderer.invoke("ReqConfig").catch(error_logger);
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
        ipcRenderer.invoke("ResConfig_Save", config).catch(error_logger);
    },
    SaveConfig: (config: JSONType) => {
        ipcRenderer.invoke("save", config).catch(error_logger);
    },
    ReceiveBase: (f: Function) => {
        ipcRenderer.removeAllListeners("sendBase");
        ipcRenderer.once("sendBase", (_, base_data) => {
            f(base_data);
        });
    },
    Kill: (f: Function) => {
        ipcRenderer.removeAllListeners("close");
        ipcRenderer.once("close", (_, pid) => {
            f(pid);
        });
    },
    Refresh: (f: Function) => {
        ipcRenderer.removeAllListeners("progress");
        ipcRenderer.on("progress", (_, progress) => {
            f(progress);
        });
    },
    Open_dir: (path: string) => {
        ipcRenderer.invoke("open_dir", path).catch(error_logger);
    },
    Progress: (f: Function) => {
        ipcRenderer.removeAllListeners("setup");
        ipcRenderer.on("setup", (_, percent) => {
            f(percent);
        });
    },
    ReqAddConfig: (
        add_obj: {},
        target: "audio" | "video",
        list: "codecList" | "qualityList" | "defaultList",
        add: boolean
    ) => {
        ipcRenderer
            .invoke("ReqAdd", add_obj, target, list, add)
            .catch(error_logger);
    },
    AddConfig: (f: Function) => {
        ipcRenderer.removeAllListeners("add");
        ipcRenderer.on(
            "add",
            (
                _,
                add_obj: {},
                target: "audio" | "video",
                list: "codecList" | "qualityList" | "defaultList",
                add: boolean
            ) => {
                f(add_obj, target, list, add);
            }
        );
    },
});
