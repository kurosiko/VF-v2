import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { CONFIG, PROGRESS } from "../Atoms/Atoms";
import { Gen_opts } from "../../func/gen_opts";
import "../css/Dev.css";
import { Progress } from "../../Progress";
import { useTransitionNavigate } from "./Tran_nav";
export const Dev = () => {
    const [config, setConfig] = useRecoilState(CONFIG);
    const [progress, setProgress] = useRecoilState(PROGRESS);
    const { transitionNavigate } = useTransitionNavigate();
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
                            pid: 20,
                            title: "ABCDEFGHIJKLMNO",
                            percent: Math.floor(Math.random() * 100),
                        } as Progress);
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
            <button onClick={() => {
                transitionNavigate("/")
            }}>test</button>
        </>
    );
};
