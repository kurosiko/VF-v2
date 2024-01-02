import React, { useRef } from "react";
import { JSONType } from "../../JsonType";
import { useRecoilState } from "recoil";
import { CONFIG } from "../Atoms/Atoms";

export const Audio = () => {
    const [config, SetConfig] = useRecoilState(CONFIG);
    const Gen_pre = () => {
        const gened_pre: JSONType = JSON.parse(JSON.stringify(config));
        return gened_pre;
    };
    function Reload(
        event: React.ChangeEvent<HTMLInputElement>,
        option: string
    ) {
        const pre = Gen_pre();
        pre.audio.boolean[`${option}`] = event.target.checked;
        SetConfig(pre);
    }
    function SL_Reload(
        event: React.ChangeEvent<HTMLSelectElement>,
        option: string
    ) {
        const pre = Gen_pre();
        pre.audio.string[`${option}`] = event.target.value;
        SetConfig(pre);
    }
    const LoadList = (target: string) => {
        const pre = [];
        let obj;
        if (target == "codec") {
            obj = config.audio.codecList;
        }
        if (target == "quality") {
            obj = config.audio.qualityList;
        }
        for (const i of Object.keys(Object(obj))) {
            pre.push(React.createElement("option", { key: i }, i));
        }
        return React.createElement(
            "select",
            {
                value: config.audio.string[`${target}`],
                onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
                    SL_Reload(e, target);
                },
            },
            [...pre]
        );
    };
    return (
        <>
            <h1 className="header">Audio</h1>
            <div className="options">
                <div className="combbox">
                    <label>Quality</label>
                    {LoadList("quality")}
                </div>
                <div className="combbox">
                    <label>Codec</label>
                    {LoadList("codec")}
                </div>
                <div className="checkbox">
                    <label className="togglebutton">
                        <input
                            type="checkbox"
                            checked={config.audio.boolean.thumbnail}
                            onChange={(e) => {
                                Reload(e, "thumbnail");
                            }}
                        />
                    </label>
                    <label>Thumbnail</label>
                </div>
                <div className="checkbox">
                    <label className="togglebutton">
                        <input
                            type="checkbox"
                            checked={config.audio.boolean.metadata}
                            onChange={(e) => {
                                Reload(e, "metadata");
                            }}
                        />
                    </label>
                    <label>Metadata</label>
                </div>
            </div>
        </>
    );
};
