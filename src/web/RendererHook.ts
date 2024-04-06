import { useRecoilState } from "recoil";
import { CONFIG, PROGRESS } from "./Atoms/Atoms";
import { JSONType } from "../VFTypes";

const [config, SetConfig] = useRecoilState(CONFIG);
const [progress, SetProgress] = useRecoilState(PROGRESS);

const PreConfig: () => JSONType = () => {
    return JSON.parse(JSON.stringify(config));
};

window.api.ResConfig((config: JSONType) => {
    SetConfig(config);
});
//Progress
window.api.ReceiveBase((base_data) => {
    SetProgress([base_data, ...progress]);
});
window.api.Kill((pid: number) => {
    if (!(pid in progress))
        return
    const result = progress.some((item) => {
        Object.keys(item)[0] == pid.toString()
    })
    console.log(result)
})
//General
window.api.ResPath((path: string) => {
    if (path) SetConfig(Object.assign(PreConfig(), { dir: path }));
});
