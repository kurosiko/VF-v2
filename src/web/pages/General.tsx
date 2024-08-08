import React, { useRef } from "react";
import { JSONType } from "../../functions/VFTypes";
import { useRecoilState, useRecoilValue } from "recoil";
import { CONFIG } from "../Atoms/Atoms";
import { Reload } from "../../functions/RendererHook";
export const General = () => {
    const config = useRecoilValue(CONFIG);
    const Path = useRef<HTMLLabelElement>(null);
    if (!Path.current) return;
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
                                Reload(
                                    ["general", "dl"],
                                    event.currentTarget.checked
                                );
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
                                Reload(
                                    ["general", "uploader"],
                                    event.currentTarget.checked
                                );
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
                                Reload(
                                    ["general", "playlist"],
                                    event.currentTarget.checked
                                );
                            }}
                        />
                    </label>
                    <label>Playlist Folder</label>
                </div>
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
                            window.api.path().then((new_path: string) => {
                                if (Path.current && new_path) {
                                    Path.current.innerText = new_path;
                                    Reload(["dir"], new_path);
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
