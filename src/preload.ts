import { contextBridge, ipcRenderer } from "electron";
import { JSONType } from "./VFTypes";
const error_logger = (text: string) => {
    console.log(text);
};
const error_logger = (text: string) => {
    console.log(text);
};
import { JSONType } from "./VFTypes";

contextBridge.exposeInMainWorld("api", {
    download: (opts: string[]) => {
        ipcRenderer.invoke("download", opts).catch(error_logger);
    },
    ReqPath: () => {
        ipcRenderer.invoke("ReqPath").catch(error_logger);
        ipcRenderer.invoke("ReqPath").catch(error_logger);
    },
    ResPath: (listener: Function) => {
        ipcRenderer.removeAllListeners("ResPath");
        ipcRenderer.removeAllListeners("ResPath");
        ipcRenderer.on("ResPath", (_, args) => {
            if (args) {
                listener(args[0]);
            }
        });
    },
    ReqConfig: () => {
        ipcRenderer.invoke("ReqConfig").catch(error_logger);
        ipcRenderer.invoke("ReqConfig").catch(error_logger);
    },
    ResConfig: (config: Function) => {
        ipcRenderer.removeAllListeners("ResConfig");
        ipcRenderer.once("ResConfig", (_, args) => {
            config(args);
        });
    },
    Exit_Req: (sendConfig: Function) => {
        ipcRenderer.removeAllListeners("exit_req");
        ipcRenderer.on("exit_req", (_) => {
    Exit_Req: (sendConfig: Function) => {
        ipcRenderer.removeAllListeners("exit_req");
        ipcRenderer.on("exit_req", (_) => {
            sendConfig();
        });
    },
    Exit_Res: (config: JSONType) => {
        ipcRenderer.invoke("exit_res", config).catch(error_logger);
    Exit_Res: (config: JSONType) => {
        ipcRenderer.invoke("exit_res", config).catch(error_logger);
    },
    SaveConfig: (config: JSONType) => {
        ipcRenderer.invoke("save", config).catch(error_logger);
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
        ipcRenderer.removeAllListeners("close");
        ipcRenderer.once("close", (_, pid) => {
            if (pid) f(pid);
        });
            if (pid) f(pid);
        });
    },
    Refresh: (f: Function) => {
        ipcRenderer.removeAllListeners("progress");
        ipcRenderer.once("progress", (_, progress) => {
            f(progress);
        });
        ipcRenderer.once("progress", (_, progress) => {
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
