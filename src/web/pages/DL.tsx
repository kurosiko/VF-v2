import React, { useRef, useState } from "react"
import "../css/DL.css"
import "../css/ProgressBar.css"
import { Str_Dict } from "../../JsonType"
import { CONFIG } from "../Atoms/Atoms"
import { useRecoilState, useSetRecoilState } from "recoil"
export const DL = ()=>{
    window.api.ResConfig(res=>{
        const defaultSet = useSetRecoilState(CONFIG)
            defaultSet(res)
    })
    window.api.ReqConfig()
    return(
        <>
            <div id="url_input" onLoad={()=>{
                
            }}>
                <form>
                    <input type="text" placeholder="Enter URL"/>
                </form>
            </div>
            <div id="space">
                <div id="show_progress">
                <label>Drop URL Here!</label>
                </div>
            </div>
        </>
    )
}