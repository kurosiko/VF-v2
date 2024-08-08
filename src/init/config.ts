import fs from "fs";
import path from "path";
import { JSONType } from "../functions/VFTypes";
import { def_cfg } from "./default";
export const load = () => {
    const JsonPath = path.resolve("./config/config.json");
    if (!fs.existsSync(JsonPath)) {
        console.log("Log not found");
        if (!fs.existsSync(path.dirname(JsonPath))) fs.mkdirSync("config");
        fs.writeFileSync(JsonPath, JSON.stringify(def_cfg, null, 4), "utf-8");
    }
    return JSON.parse(fs.readFileSync(JsonPath, "utf-8"));
};
export const save = (config: JSONType) => {
    fs.writeFileSync(
        path.resolve("./config/config.json"),
        JSON.stringify(config, null, 4),
        "utf-8"
    );
};
