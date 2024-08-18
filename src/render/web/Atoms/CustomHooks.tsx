import { useRecoilState, useSetRecoilState } from "recoil";
import { CONFIG, PROGRESS } from "./Atoms";
import { JSONType } from "../../../Types/VFTypes";
import { produce } from "immer";
import { useCallback, useEffect } from "react";
export const Reload = <T extends string | number | boolean>(
    path: string[],
    new_val: T
) => {
    const SetConfig = useSetRecoilState(PROGRESS);
    return useCallback(() => {
        SetConfig([]);
    }, [SetConfig]);
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
