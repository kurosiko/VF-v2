import { atom, useSetRecoilState, } from "recoil";
import { JSONType } from "../../JsonType";
export const CONFIG = atom<any>({
    key:"config",
    default:0
})
/*
const func_set = (config:JSONType)=>{
    const setter = useSetRecoilState(CONFIG)
    setter(config)
}
window.api.ResConfig((config:JSONType)=>{
    func_set(config)
    console.log("Refreshed")
})
*/