import React, { useRef, useState } from "react";
import "../css/DL.css";
import "../css/ProgressBar.css";
import { useRecoilState } from "recoil";
import { CONFIG, PROGRESS } from "../Atoms/Atoms";
import { Gen_opts } from "../../func/gen_opts";
import { JSONType } from "../../JsonType";
import { Queue } from "../../Queue";
export const DL = () => {
    const url = useRef<HTMLInputElement>(null);
    const [config, SetConfig] = useRecoilState(CONFIG);
    const [progress, SetProgress] = useRecoilState(PROGRESS);
    window.api.ResConfig((res: JSONType) => {
        SetConfig(res);
    });
    if (!url) {
        return;
    }
    if (config.dir == "null") {
        console.log("Reload");
        window.api.ReqConfig();
    }
    function download(url: string) {
        window.api.download(Gen_opts(url, config));
    }
    function load_progress() {
        const test = [
            {
                pid:20,
                title: "SAKURA",
                percent: 50,
                thumbnail:
                    "https://i1.sndcdn.com/artworks-c7WnXKYIXUQ5mASP-YvK1cw-original.jpg",
            }
        ];
        const queue = progress.map((item: Queue): JSX.Element => {
            console.log(item);
            return (
                <div className="progress">
                    <img src={item.thumbnail}></img>
                    <div className="progress_main">
                        <div className="progress_data">
                            <label className="title">{item.title}</label>
                            <label className="percent">{item.percent}%</label>
                            <label>{item.pid}</label>
                        </div>
                        <progress
                            value={item.percent}
                            max={100}
                            className="progressbar"
                        >
                            {item.percent}%
                        </progress>
                    </div>
                </div>
            );
        });
        return queue;
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
                        download(event.dataTransfer.getData("text"));
                    }
                }}
                onDragOver={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                }}
            >
                <div id="show_progress">
                    {progress.length == 0 ? (
                        <label>Drop Here!</label>
                    ) : (
                        load_progress()
                    )}
                </div>
            </div>
        </>
    );
};
