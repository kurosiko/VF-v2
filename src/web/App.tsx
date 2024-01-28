import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./css/Back.css";
import "./css/General.css";
import "./css/Toast.css"
import { DL } from "./pages/DL";
import { Error } from "./pages/Error";
import { Option } from "./Option";
import { JSONType } from "../JsonType";
import { useRecoilState } from "recoil";
import { CONFIG, PROGRESS } from "./Atoms/Atoms";
import { Progress } from "../Progress";
import { useTransitionNavigate } from "./pages/Tran_nav";
export const App = () => {
    const { transitionNavigate } = useTransitionNavigate();
    const [config, SetConfig] = useRecoilState(CONFIG);
    const [progress, SetProgress] = useRecoilState(PROGRESS);
    window.api.ResConfig((Res: JSONType) => {
        SetConfig(Res);
    });
    window.api.ReqConfig_Save(() => {
        window.api.ResConfig_Save(config);
    });
    window.api.ReceiveBase((base_data: Progress) => {
        SetProgress([base_data, ...progress]);
    });
    window.api.Kill((pid: number) => {
        console.log(pid);
        SetProgress(
            progress.filter((item: Progress) => {
                return item.pid != pid;
            })
        );
    });
    window.api.Refresh((Refresh: Progress) => {
        const target = progress.findIndex((item: Progress) => {
            return item.pid == Refresh.pid;
        });
        const pre = [...progress];
        pre[target] = Object.assign(
            JSON.parse(JSON.stringify(progress[target])),
            Refresh
        );
        SetProgress(pre);
    });
    console.log(config);
    console.log(progress);
    const Gen_pre = () => {
        const gened_pre: JSONType = JSON.parse(JSON.stringify(config));
        return gened_pre;
    };
    function Reload(
        event: React.ChangeEvent<HTMLInputElement>,
        option: string
    ) {
        const pre = Gen_pre();
        pre.general[`${option}`] = event.target.checked;
        SetConfig(pre);
    }
    return (
        <>
            <div
                id="main"
                draggable={false}
                onDrop={(event) => {
                    console.log(event);
                }}
            >
                <div id="menu">
                    {window.location.hash === "#/" ||
                    window.location.hash === "" ? (
                        <h2
                            onClick={() => {
                                console.log(config);
                            }}
                        >
                            SETTING
                        </h2>
                    ) : (
                        <button
                            onClick={() => {
                                transitionNavigate("option/dev");
                            }}
                        >
                            Dev
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => {
                            transitionNavigate("option/general");
                        }}
                    >
                        General
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            transitionNavigate("option/video");
                        }}
                    >
                        Video
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            transitionNavigate("option/audio");
                        }}
                    >
                        Audio
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            transitionNavigate("option/other");
                        }}
                    >
                        Other
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            transitionNavigate("option/log");
                        }}
                    >
                        Log
                    </button>
                    <div className="checkbox">
                        <div>
                            <label className="togglebutton">
                                <input
                                    type="checkbox"
                                    checked={config.general.list}
                                    onChange={(e) => {
                                        Reload(e, "list");
                                    }}
                                />
                            </label>
                        </div>
                        <label>Playlist</label>
                    </div>
                    <div className="checkbox">
                        <div>
                            <label className="togglebutton">
                                <input
                                    type="checkbox"
                                    checked={config.general.only}
                                    onChange={(e) => {
                                        Reload(e, "only");
                                    }}
                                />
                            </label>
                        </div>
                        <label>Audio Only</label>
                    </div>
                </div>
                <div id="inputbox">
                    <Routes>
                        <Route path="option/*" element={<Option />} />
                        <Route path="/" element={<DL />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </div>
            </div>
        </>
    );
};
