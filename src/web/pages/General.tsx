import React, { useRef } from "react";
import { JSONType } from "../../VFTypes";
import { useRecoilState } from "recoil";
import { CONFIG } from "../Atoms/Atoms";
export const General = () => {
    const [config, SetConfig] = useRecoilState(CONFIG);
    const Path = useRef<HTMLLabelElement>(null);
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
    if (!Path) {
        return;
    }
    return (
        <>
            <h1 className="header">General</h1>
            <div className="options">
                <div className="checkbox">
                    <label className="togglebutton">
                        <input
                            type="checkbox"
                            checked={config.general.dl}
                            onChange={(e) => {
                                Reload(e, "dl");
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
                            onChange={(e) => {
                                Reload(e, "uploader");
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
                            onChange={(e) => {
                                Reload(e, "playlist");
                            }}
                        />
                    </label>
                    <label>Playlist Folder</label>
                </div>
                <div id="path">
                    <label
                        onClick={(event) => {
                            if (!(config.dir == "null"))
                                window.api.Open_dir(config.dir);
                        }}
                        ref={Path}
                    >
                        {config.dir ? config.dir : "PATH"}
                    </label>
                    <button
                        onClick={(event) => {
                            window.api.ResPath((path: string) => {
                                if (Path.current && path) {
                                    Path.current.innerText = path;
                                    const pre = Gen_pre();
                                    pre.dir = path;
                                    SetConfig(pre);
                                }
                            });
                            window.api.ReqPath();
                        }}
                    >
                        Browse
                    </button>
                </div>
            </div>
        </>
    );
};
