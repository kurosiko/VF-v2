import React from "react";
import { useNavigate, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import "./css/Back.css";
import "./css/General.css";
import { DL } from "./pages/DL";
import { Error } from "./pages/Error";
import { Option } from "./Option";
import { JSONType } from "../JsonType";
import { useRecoilState } from "recoil";
import { CONFIG, PROGRESS } from "./Atoms/Atoms";
import { Queue } from "../Queue";
export const App = () => {
    const navigate = useNavigate();
    const [config, SetConfig] = useRecoilState(CONFIG);
    const [progress,SetProgress] = useRecoilState(PROGRESS)
    window.api.ResConfig((Res: JSONType) => {
        SetConfig(Res);
    });
    window.api.ResProgress((Res: Queue) => {
        const pre = [...progress]
        pre.push(Res)
        SetProgress(pre)
    })
    window.api.ReqConfig_Save(() => {
        console.log("close Req");
        window.api.ResConfig_Save(config);
    });
    console.log(config);
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
                                navigate("option/dev");
                            }}
                        >
                            Dev
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => {
                            navigate("option/general");
                        }}
                    >
                        General
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            navigate("option/video");
                        }}
                    >
                        Video
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            navigate("option/audio");
                        }}
                    >
                        Audio
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            navigate("option/other");
                        }}
                    >
                        Other
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            navigate("option/log");
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
