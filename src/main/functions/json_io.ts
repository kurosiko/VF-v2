import fs from "fs";
import { def_Type } from "../../Types/AllowType";
import { def_cfg, def_win } from "../init/default";
import { JSONType, WinState } from "../../Types/VFTypes";

type ConfigKind = "config" | "window";
type ConfigType<T> =
    T extends "config" ? JSONType :
    T extends "window" ? WinState :
    never;

const getConfigPath = (kind: ConfigKind) => `config/${kind}.json`;

function loadDefault<T extends ConfigKind>(kind: ConfigKind): ConfigType<T> | null {
    return kind === "config" ? def_cfg as ConfigType<T> : kind === "window" ? def_win as ConfigType<T> : null;
}

export const loadConfig = (kind: ConfigKind) => {
    const path = getConfigPath(kind);
    if (!fs.existsSync(path)) {
        fs.mkdirSync("config", { recursive: true });
        fs.writeFileSync(path, JSON.stringify(loadDefault(kind), null, 4));
    }
    return JSON.parse(fs.readFileSync(path, "utf-8"));
};

export function saveConfig<T extends ConfigKind>(kind: ConfigKind, config: ConfigType<T>) {
    fs.writeFileSync(getConfigPath(kind), JSON.stringify(config, null, 4), "utf-8");
};
