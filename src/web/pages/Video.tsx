import React from "react";
import { JSONType } from "../../JsonType";
import { useRecoilState } from "recoil";
import { CONFIG } from "../Atoms/Atoms";
export const Video = () => {
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
        pre.video.boolean[`${option}`] = event.target.checked;
        SetConfig(pre);
    }
    function SL_Reload(
        event: React.ChangeEvent<HTMLSelectElement>,
        option: string
    ) {
        const pre = Gen_pre();
        pre.video.string[`${option}`] = event.target.value;
        SetConfig(pre);
    }
    const LoadList = (target: string) => {
        const pre = [];
        let obj;
        if (target == "codec") {
            obj = config.video.codecList;
        }
        if (target == "quality") {
            obj = config.video.qualityList;
        }
        for (const i of Object.keys(Object(obj))) {
            pre.push(React.createElement("option", { key: i }, i));
        }
        return React.createElement(
            "select",
            {
                value: config.video.string[`${target}`],
                onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
                    SL_Reload(e, target);
                },
            },
            [...pre]
        );
    };
    return (
        <>
            <h1 className="header">Video</h1>
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
                            checked={config.video.boolean.force}
                            onChange={(e) => {
                                Reload(e, "force");
                            }}
                        />
                    </label>
                    <label>Force convert</label>
                </div>
                <div className="checkbox">
                    <label className="togglebutton">
                        <input
                            type="checkbox"
                            checked={config.video.boolean.thumbnail}
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
                            checked={config.video.boolean.metadata}
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
