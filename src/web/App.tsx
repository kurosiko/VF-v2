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
import { CONFIG } from "./Atoms/Atoms";
export const App = () => {
    const navigate = useNavigate();
    const [config, SetConfig] = useRecoilState(CONFIG);
    window.api.ResConfig((Res: JSONType) => {
        SetConfig(Res);
    });
    console.log(config);
    return (
        <>
            <div id="main" draggable="true" onDrop={(event) => {}}>
                <div id="menu">
                    <h2
                        onClick={() => {
                            console.log(config);
                        }}
                    >
                        SETTING
                    </h2>
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
                                <input type="checkbox" />
                            </label>
                        </div>
                        <label>Playlist</label>
                    </div>
                    <div className="checkbox">
                        <div>
                            <label className="togglebutton">
                                <input type="checkbox" />
                            </label>
                        </div>
                        <label>Audio Only</label>
                    </div>
                    <Link to={"/"}>Home(dev)</Link>
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
