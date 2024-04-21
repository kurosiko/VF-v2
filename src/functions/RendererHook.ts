import { useRecoilState } from "recoil";
import { CONFIG, PROGRESS } from "../web/Atoms/Atoms";
import { JSONType } from "../VFTypes";
import { Progress } from "../Progress";

export const IPCRegister = () => {
    const [config, SetConfig] = useRecoilState(CONFIG);
    const [progress, SetProgress] = useRecoilState(PROGRESS);

    const PreConfig: () => JSONType = () => {
        return JSON.parse(JSON.stringify(config));
    };
    //exit
    window.api.Exit_Req(() => {
        window.api.Exit_Res(config)
    })
    //Config
    window.api.ResConfig((config: JSONType) => {
        SetConfig(config);
    });
    /*
    window.api.AddConfig(
        (
            obj: {},
            target: "video" | "audio",
            list: "codecList" | "qualityList" | "defaultList",
            add: boolean
        ) => {
            console.log(obj);
            console.log(target);
            console.log(list);
            console.log(add);
            const pre = PreConfig();
            if (add) {
                Object.assign(pre[target][list], obj);
            } else {
                delete pre[target][list][Object.keys(obj)[0]];
            }
            SetConfig(pre);
        }
    );
    */
    //Progress
    window.api.ReceiveBase((base_data) => {
        SetProgress([base_data, ...progress]);
    });
    window.api.Refresh((thread: Progress) => {
        if (thread == undefined) return;
        const target = progress.map((item: Progress) => {
            if (item.pid != thread.pid) return item;
            return Object.assign(structuredClone(item), thread);
        });
        SetProgress(target);
    });
    window.api.Kill((pid: number) => {
        SetProgress(
            progress.filter((item) => {
                return item.pid != pid;
            })
        );
    });
    //General
    window.api.ResPath((path: string) => {
        if (path) SetConfig(Object.assign(PreConfig(), { dir: path }));
    });
};
