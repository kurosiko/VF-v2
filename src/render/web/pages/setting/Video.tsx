import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { CONFIG } from "../../Atoms/Atoms";
export const Video = () => {
    const [config, SetConfig] = useRecoilState(CONFIG);
    const [open, SetOpen] = useState(false);
    const Gen_pre = () => {
        return JSON.parse(JSON.stringify(config));
    };
    function Reload(
        event: React.ChangeEvent<HTMLInputElement>,
        option: string
    ) {
        const pre = Gen_pre();
        pre.video.boolean[option] = event.target.checked;
        SetConfig(pre);
    }
    const LoadList = (target: "codecList" | "qualityList" | "defaultList") => {
        const pre: React.ReactElement[] = [];
        const lists = config.video[target];
        const match: { [key: string]: string } = {
            codecList: "codec",
            qualityList: "quality",
            defaultList: "default",
        };
        let default_value;
        for (const key of Object.keys(lists)) {
            pre.push(
                <option key={key} value={config.video[target][key]}>
                    {key}:{config.video[target][key]}
                </option>
            );
            if (config.video.string[match[target]] == config.video[target][key])
                default_value = config.video.string[match[target]];
        }
        return (
            <>
                <select
                    value={default_value}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                        const pre = Gen_pre();
                        pre.video.string[match[target]] = event.target.value;
                        SetConfig(pre);
                    }}
                >
                    {[...pre]}
                </select>
                <button className="edit" onClick={(event) => {}}>
                    Edit
                </button>
            </>
        );
    };
    return (
        <>
            <h1 className="header">Video</h1>
            <div className="options">
                <div className="combbox">
                    <label>Quality</label>
                    {LoadList("qualityList")}
                </div>
                <div className="combbox">
                    <label>Codec</label>
                    {LoadList("codecList")}
                </div>
                <div className="combbox">
                    <label>Default</label>
                    {LoadList("defaultList")}
                </div>
                {["force", "thumbnail", "metadata"].map((option) => {
                    return (
                        <div className="checkbox" key={option}>
                            <label className="togglebutton">
                                <input
                                    type="checkbox"
                                    checked={config.video.boolean[option]}
                                    onChange={(e) => {
                                        Reload(e, option);
                                    }}
                                ></input>
                            </label>
                            <label>
                                {option.charAt(0).toUpperCase() +
                                    option.slice(1)}
                            </label>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
