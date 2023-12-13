import fs from "fs"
import path from "path"
import { JSONType } from "../JsonType"
export const load = ()=>{
    return JSON.parse(fs.readFileSync(path.resolve("./config/config.json"),'utf-8'))
}
export const save = (config:JSONType)=>{
    fs.writeFileSync(path.resolve("./config/config.json"),JSON.stringify(config,null,' '),'utf-8')
}