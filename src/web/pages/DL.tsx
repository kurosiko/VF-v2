import React, { useRef } from "react";
import "../css/ProgressBar.css";
import { useRecoilState } from "recoil";
import { CONFIG, PROGRESS } from "../Atoms/Atoms";
import { Gen_opts } from "../../functions/gen_opts";
import { JSONType } from "../../VFTypes";
import { Progress } from "../../Progress";
export const DL = () => {
    const url = useRef<HTMLInputElement>(null);
    const [config, SetConfig] = useRecoilState(CONFIG);
    const [progress, SetProgress] = useRecoilState(PROGRESS);
    window.api.ResConfig((res: JSONType) => {
        SetConfig(res);
    });
    if (!url) return;
    function download(url: string) {
        window.api.download(Gen_opts(url, config));
    }
    function load_progress() {
        const queue = progress.map((item: Progress): JSX.Element => {
            return (
                <div className="progress" key={item.pid}>
                    <div className="thumbnail">
                        <img src={item.thumbnail} />
                    </div>
                    <div className="progress_main">
                        <div className="progress_data">
                            <label className="title">{item.title}</label>
                            <label className="percent">{item.percent}%</label>
                            <label
                                className="pid"
                                style={{
                                    display: config.other.div
                                        ? "block"
                                        : "none",
                                }}
                            >
                                {item.pid}
                            </label>
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
                        url.current.value = "";
                    }
                }}
                onDoubleClick={async (event) => {
                    navigator.clipboard.readText().then((text) => {
                        if (URL.canParse(text)) {
                            download(text);
                        } else {
                            console.log("Error Toast"); //create a error toast message
                        }
                    });
                }}
            >
                <form>
                    <input
                        type="text"
                        placeholder="Enter URL or Double Click to Paste"
                        ref={url}
                    />
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
