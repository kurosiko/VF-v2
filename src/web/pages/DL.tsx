import React, { useRef, useState } from "react";
import "../css/DL.css";
import "../css/ProgressBar.css";
import { useRecoilState } from "recoil";
import { CONFIG } from "../Atoms/Atoms";
import { Gen_opts } from "../../func/gen_opts";

export const DL = () => {
    const url = useRef<HTMLInputElement>(null);
    const [config, SetConfig] = useRecoilState(CONFIG);
    if (!url) {
        return;
    }
    function download(url:string) {
        window.api.download(Gen_opts(url,config))
    }
    return (
        <>
            <div
                id="url_input"
                onSubmit={() => {
                    if (url.current?.value) {
                        download(url.current.value);
                    }
                }}
            >
                <form>
                    <input type="text" placeholder="Enter URL" ref={url} />
                </form>
            </div>
            <div
                id="space"
                onDrop={(event) => {
                    event.preventDefault();
                    if (event.dataTransfer.getData("text")) {
                        download(event.dataTransfer.getData("text"))
                    }
                }}
                onDragOver={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                }}
            >
                <div id="show_progress">
                    <label>Drop URL Here!</label>
                </div>
            </div>
        </>
    );
};
