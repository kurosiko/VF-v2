import React from "react";
import { useRecoilState } from "recoil";
import { CONFIG, PROGRESS } from "../Atoms/Atoms";
import { Gen_opts } from "../../functions/gen_opts";
import "../css/Dev.css";
import { Progress } from "../../Progress";
import { useTransitionNavigate } from "./Tran_nav";
import { General } from "./General";
import { Video } from "./Video";
import { Audio } from "./Audio";
import { Other } from "./Other";
import { Log } from "./Log";
import { ProgressBar } from "./Progress";
import { Error } from "./Error";
import { Popup } from "../../functions/popup";
export const Dev = () => {
    const [config, setConfig] = useRecoilState(CONFIG);
    const [progress, setProgress] = useRecoilState(PROGRESS);
    const { transitionNavigate } = useTransitionNavigate();
    return (
        <>
            <h1 className="header">Developer</h1>
            <div id="dev">
                <button
                    onClick={() => {
                        window.api.download(
                            Gen_opts(
                                "https://www.youtube.com/watch?v=rdwz7QiG0lk",
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
                        window.api.Exit_Res(config);
                    }}
                >
                    Kill
                </button>
                <button
                    onClick={() => {
                        transitionNavigate("../progress");
                    }}
                >
                    progress
                </button>
                <button
                    onClick={() => {
                        console.log(
                            `yt-dlp ${Gen_opts("test", config).join(" ")}`
                        );
                    }}
                >
                    gen_opts
                </button>
            </div>
            <div id="tabs">
                <General />
                <Video />
                <Audio />
                <Other />
                <Log />
                <ProgressBar />
                <Error />
            </div>
        </>
    );
};
