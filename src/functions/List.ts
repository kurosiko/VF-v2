import { def_Type, target_Type } from "./AllowType";
import { def_cfg, def_win } from "../init/default";
export const targetList = (target: target_Type) => {
    const dict: dict_Type<target_Type> = {
        config: { def_opts: def_cfg },
        window: { def_opts: def_win },
    };
    return Object.assign(
        { target_path: `config/${target}.json` },
        dict[target]
    );
};

type dict_Type<T extends target_Type> = {
    [key in T]: {
        def_opts: def_Type;
    };
};
