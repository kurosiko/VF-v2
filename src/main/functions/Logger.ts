import fs from "fs";
import path from "path";
import { JSONType } from "../../Types/VFTypes";
export const Logger = (str: string, options?: JSONType | string[] | string) => {
    const data = new Date();
    const y = data.getFullYear();
    const m = data.getMonth();
    const d = data.getDate();
    const h = data.getHours();
    const min = data.getMinutes();
    const sec = data.getSeconds();
    if (!fs.existsSync("log")) {
        fs.mkdirSync("log");
    }
    fs.writeFileSync(
        path.join("log", `${[y, m, d, h, min, sec].join("-")}.txt`),
        `${str}\n${options?.toString() ?? ""}`,
        "utf-8"
    );
};
