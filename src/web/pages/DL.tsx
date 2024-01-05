import React, { useRef, useState } from "react";
import "../css/DL.css";
import "../css/ProgressBar.css";
import { useRecoilState } from "recoil";
import { CONFIG } from "../Atoms/Atoms";
export const DL = () => {
    const url = useRef<HTMLInputElement>(null)
    const [config,SetConfig] = useRecoilState(CONFIG)
    if (!url) {
        return
    }
    return (
        <>
            <div id="url_input" onSubmit={() => {
                console.log(url.current?.value)
                //hand to download func ydl opts and url()?
            }}>
                <form>
                    <input type="text" placeholder="Enter URL" ref={url}/>
                </form>
            </div>
            <div id="space" onDrop={(event) => {
                    console.log("test")
                    console.log(event)
                }}>
                <div id="show_progress">
                    <label>Drop URL Here!</label>
                </div>
            </div>
        </>
    );
};
