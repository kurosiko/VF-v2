import { Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import "./App.css";
import { CONFIG } from "./render/web/Atoms/Atoms";
import "./render/web/css/Back.css";
import "./render/web/css/DL.css";
import "./render/web/css/General.css";
import "./render/web/css/Toast.css";
import { Error } from "./render/web/pages/Error";
import { Log } from "./render/web/pages/Log";
import { ProgressBar } from "./render/web/pages/Progress";
import { useTransitionNavigate } from "./render/web/pages/Tran_nav";
import { Setting } from "./render/web/pages/UI";
import { JSONType } from "./Types/VFTypes";
import { Reload } from "./render/web/Atoms/CustomHooks";
export const App = () => {
    const { transitionNavigate } = useTransitionNavigate();
    const [config, SetConfig] = useRecoilState(CONFIG);
    const Reload = (callback: (dupe: JSONType) => JSONType):void => {
        const altered = callback(structuredClone(config));
        SetConfig(altered);
    };
    const Link = (path: string) => {
        transitionNavigate(path, Reload);
    };
    if (config.dir == "null")
        window.api.config().then((config: JSONType) => {
            SetConfig(config);
            console.log("Req");
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
                                Link("");
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
                            Link("general");
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
                            Link("video");
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
                            Link("audio");
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
                            Link("other");
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
                            Link("log");
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
                                    checked={config.general.playlist}
                                    onChange={(event) => {
                                        Reload((dupe) => {
                                            dupe.general.playlist =
                                                event.currentTarget.checked;
                                            return dupe;
                                        });
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
                                    checked={config.general.list}
                                    onChange={(event) => {
                                        Reload((dupe) => {
                                            dupe.general.list =
                                                event.currentTarget.checked;
                                            return dupe;
                                        });
                                    }}
                                />
                            </label>
                        </div>
                        <label>Audio Only</label>
                    </div>
                    {config.other.dev && (
                        <button
                            onClick={() => {
                                Link("Dev");
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
                        <Route path="/*" element={<Setting />} />
                        <Route path="/progress" element={<ProgressBar />} />
                        <Route path="/log" element={<Log />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </div>
            </div>
        </>
    );
};
