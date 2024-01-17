import React from "react";
import { useRecoilState } from "recoil";
import { CONFIG, PROGRESS } from "../Atoms/Atoms";
import { Gen_opts } from "../../func/gen_opts";
import "../css/Dev.css"
import { Queue } from "../../Queue";
export const Dev = () => {
    const [config, setConfig] = useRecoilState(CONFIG)
    const [progress, setProgress] = useRecoilState(PROGRESS)
    return (
        <>
            <h1 className="header">Developer</h1>
            <div id="dev">
                <a href="https://github.com/kurosiko/VF-v2">Repository</a>
                <button
                    onClick={() => {
                        window.api.download(Gen_opts("test", config));
                    }}
                >
                    Download
                </button>
                <button
                    onClick={() => {
                        const pre = [...progress];
                        pre.push({
                            pid:20,
                            title: "SAKURA"
                        } as Queue);
                        console.log(pre);
                        setProgress(pre);
                    }}
                >
                    Add
                </button>
                <button
                    onClick={() => {
                        setProgress([]);
                    }}
                >
                    Clear
                </button>
            </div>
        </>
    );
};
