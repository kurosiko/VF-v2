import { useRecoilState } from "recoil";
import { CONFIG, PROGRESS } from "../web/Atoms/Atoms";
import { JSONType } from "./VFTypes";
import { Progress } from "./Progress";
import { produce } from "immer";

export const IPCRegister = () => {
    return;
};
function updateObject<T>(data: T, path: string[], newValue: any): T {
    return produce(data, (draft) => {
        let current = draft as any;
        path.slice(0, -1).forEach((key) => {
            current = current[key];
        });
        current[path[path.length - 1]] = newValue;
    });
}
export const Reload = <T extends string | number | boolean>(
    path: string[],
    new_val: T
): void => {
    const [config, SetConfig] = useRecoilState(CONFIG);
    SetConfig((curr_val) => {
        return updateObject<JSONType>(curr_val, path, new_val);
    });
};
