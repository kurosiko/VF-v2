import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./css/Back.css";
import "./css/General.css";
import "./css/Toast.css";
import "./css/DL.css";
import { DL } from "./pages/DL";
import { Error } from "./pages/Error";
import { General } from "./pages/General";
import { Video } from "./pages/Video";
import { Audio } from "./pages/Audio";
import { Other } from "./pages/Other";
import { Log } from "./pages/Log";
import { Dev } from "./pages/Dev";
import { JSONType } from "../functions/VFTypes";
import { useRecoilState } from "recoil";
import { CONFIG, PROGRESS } from "./Atoms/Atoms";
import { Progress } from "../functions/Progress";
import { useTransitionNavigate } from "./pages/Tran_nav";
import { ProgressBar } from "./pages/Progress";
import { IPCRegister, Reload } from "../functions/RendererHook";
import { ipcRenderer } from "electron";

export const App = () => {
    const { transitionNavigate } = useTransitionNavigate();
    const [config, SetConfig] = useRecoilState(CONFIG);
    IPCRegister();
    if (config.dir == "null")
        window.api.config().then((config: JSONType) => {
            SetConfig(config);
        });
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
                                transitionNavigate(".");
                            }}
                        >
                            <span className="material-symbols-outlined icon">
                                home
                            </span>
                            <label>Home</label>
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => {
                            transitionNavigate("general");
                        }}
                    >
                        <span className="material-symbols-outlined icon">
                            folder
                        </span>
                        <label>General</label>
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            transitionNavigate("video");
                        }}
                    >
                        <span className="material-symbols-outlined icon">
                            movie
                        </span>
                        <label>Video</label>
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            transitionNavigate("audio");
                        }}
                    >
                        <span className="material-symbols-outlined icon">
                            volume_up
                        </span>
                        <label>Audio</label>
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            transitionNavigate("other");
                        }}
                    >
                        <span className="material-symbols-outlined icon">
                            tune
                        </span>
                        <label>Other</label>
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            transitionNavigate("log");
                        }}
                    >
                        <span className="material-symbols-outlined icon">
                            subject
                        </span>
                        <label>Log</label>
                    </button>
                    <div className="checkbox">
                        <div>
                            <label className="togglebutton">
                                <input
                                    type="checkbox"
                                    checked={config.general.list}
                                    onChange={(event) => {
                                        Reload(
                                            ["general", "list"],
                                            event.currentTarget.checked
                                        );
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
                                    onChange={(event) => {
                                        Reload(
                                            ["general", "only"],
                                            event.currentTarget.checked
                                        );
                                    }}
                                />
                            </label>
                        </div>
                        <label>Audio Only</label>
                    </div>
                    {config.other.dev && (
                        <button
                            onClick={() => {
                                transitionNavigate("Dev");
                            }}
                        >
                            <span className="material-symbols-outlined icon">
                                code
                            </span>
                            <label>Dev</label>
                        </button>
                    )}
                </div>
                <div id="inputbox">
                    <Routes>
                        <Route path="/general" element={<General />} />
                        <Route path="/video" element={<Video />} />
                        <Route path="/audio" element={<Audio />} />
                        <Route path="/other" element={<Other />} />
                        <Route path="/log" element={<Log />} />
                        <Route path="/dev" element={<Dev />} />
                        <Route path="/progress" element={<ProgressBar />} />
                        <Route path="/" element={<DL />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </div>
            </div>
        </>
    );
};
