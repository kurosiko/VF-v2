import React from "react";
import { useRecoilState } from "recoil";
import { CONFIG, PROGRESS } from "../Atoms/Atoms";
import { Gen_opts } from "../../func/gen_opts";
import "../css/Dev.css";
import { Progress } from "../../Progress";
import { useTransitionNavigate } from "./Tran_nav";
import { escape } from "querystring";
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
                        window.api.download(
                            Gen_opts(
                                "https://www.youtube.com/watch?v=YvJYz2SSK6k",
                                config
                            )
                        );
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
                <button
                    onClick={() => {
                        transitionNavigate("/");
                    }}
                >
                    Tran_nav
                </button>
                <button
                    onClick={() => {
                        window.api.Open_dir("./");
                    }}
                >
                    Base dir
                </button>
                <button
                    onClick={() => {
                        window.api.ResConfig_Save(config)
                    }}
                >
                    Base dir
                </button>
            </div>
        </>
    );
};
