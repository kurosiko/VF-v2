import { useRef } from "react";
import { useRecoilState } from "recoil";
import { Config } from "../../functions/gen_opts";
import { CONFIG } from "../Atoms/Atoms";
import { Reload } from "../Atoms/CustomHooks";

export const General = () => {
    const [config, SetConfig] = useRecoilState(CONFIG);
    const Path = useRef<HTMLLabelElement>(null);
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
