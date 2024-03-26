import { def_cfg, def_win } from "../../default/default";

const target_List = ["config", "window"] as const;
const def_List = [def_cfg, def_win] as const;
export type DefType<T> = T extends readonly (infer U)[] ? U : never;
export type target_Type = DefType<typeof target_List>;
export type def_Type = DefType<typeof def_List>;
