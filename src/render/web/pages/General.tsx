import { useRef } from "react";
import { useRecoilState } from "recoil";
import { Config } from "../../functions/gen_opts";
import { CONFIG } from "../Atoms/Atoms";
import { useLocation } from "react-router-dom";
import { JSONType } from "../../../Types/VFTypes";

export const General = () => {
    const [config, SetConfig] = useRecoilState(CONFIG);
    const Path = useRef<HTMLLabelElement>(null);
    const Reload = (callback: (dupe: JSONType) => JSONType): void => {
        const dupe = structuredClone(config);
        const altered = callback(dupe);
        SetConfig(altered);
    };
    return (
        <>
            <h1 className="header">General</h1>
            <div className="options">
                <div className="checkbox">
                    <label className="togglebutton">
                        <input
                            type="checkbox"
                            checked={config.general.dl}
                            onChange={(event) => {
                                Reload((dupe) => {
                                    dupe.general.dl =
                                        event.currentTarget.checked;
                                    return dupe;
                                });
                            }}
                        />
                    </label>
                    <label>DL Folder</label>
                </div>
                <div className="checkbox">
                    <label className="togglebutton">
                        <input
                            type="checkbox"
                            checked={config.general.uploader}
                            onChange={(event) => {
                                Reload((dupe) => {
                                    dupe.general.uploader =
                                        event.currentTarget.checked;
                                    return dupe;
                                });
                            }}
                        />
                    </label>
                    <label>Uploader Folder</label>
                </div>
                <div className="checkbox">
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
                    <label>Playlist Folder</label>
                </div>
                <label>{new Config("[URL]", config).genOutput()}</label>
                <div id="path">
                    <label
                        onClick={() => {
                            if (config.dir != "null")
                                window.api.explorer(config.dir);
                        }}
                        ref={Path}
                    >
                        {config.dir ? config.dir : "PATH"}
                    </label>
                    <button
                        onClick={() => {
                            window.api.path().then((new_path: string[]) => {
                                if (Path.current && new_path[0]) {
                                    Path.current.innerText = new_path[0];
                                    Reload((dupe) => {
                                        dupe.dir = new_path[0];
                                        return dupe;
                                    });
                                }
                            });
                        }}
                    >
                        Browse
                    </button>
                </div>
            </div>
        </>
    );
};
