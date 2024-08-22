import { Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import "./App.css";
import { CONFIG } from "./render/web/Atoms/Atoms";
import "./render/web/css/Back.css";
import "./render/web/css/DL.css";
import "./render/web/css/General.css";
import "./render/web/css/Toast.css";
import { Error } from "./render/web/pages/Error";
import { Init } from "./render/web/pages/Init";
import { Log } from "./render/web/pages/Log";
import { useTransitionNavigate } from "./render/web/pages/Tran_nav";
import { Setting } from "./render/web/pages/UI";
import { JSONType } from "./Types/VFTypes";

export const App = () => {
    const { transitionNavigate } = useTransitionNavigate();
    const [config, SetConfig] = useRecoilState(CONFIG);
    const Reload = (callback: (dupe: JSONType) => JSONType): void => {
        const dupe = structuredClone(config);
        const altered = callback(dupe);
        SetConfig(altered);
    };
    const Link = (path: string, state?: any) => {
        transitionNavigate(path, state);
    };

    window.api.mainExit(() => {
        if (config.ytdlp_v != "null") window.api.renderExit(config);
    });
    window.api.setup((_: string) => {
        console.log(_);
        if (_) {
            Link("init");
        } else {
            Link("");
            window.api.config().then((config: JSONType) => {
                SetConfig(config);
            });
        }
    });
    if (config.dir == "null") {
        window.api.config().then((config: JSONType) => {
            SetConfig(config);
        });
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
                        <label>Playlist</label>
                    </div>
                    <div className="checkbox">
                        <div>
                            <label className="togglebutton">
                                <input
                                    type="checkbox"
                                    checked={config.general.only}
                                    onChange={(event) => {
                                        Reload((dupe) => {
                                            dupe.general.only =
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
                        <Route path="/init" element={<Init />} />
                        <Route path="/log" element={<Log />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </div>
            </div>
        </>
    );
};
