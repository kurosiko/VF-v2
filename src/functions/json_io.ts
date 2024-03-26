import fs from "fs";
import { def_Type } from "./Types/AllowType";

export const load = ({
    def_opts,
    target_path = "config/config.json",
}: {
    target_path: string;
    def_opts: def_Type;
}) => {
    if (!fs.existsSync(target_path)) {
        fs.mkdirSync("config", { recursive: true });
        fs.writeFileSync(target_path, JSON.stringify(def_opts, null, 4));
    }
    return JSON.parse(fs.readFileSync(target_path, "utf-8"));
};

export const save = (
    config: def_Type,
    { target_path }: { target_path: string } = {
        target_path: "config/config.json",
    }
) => {
    fs.writeFileSync(target_path, JSON.stringify(config, null, 4), "utf-8");
};
