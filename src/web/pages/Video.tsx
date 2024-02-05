import React from "react";
import { useRecoilState } from "recoil";
import { CONFIG } from "../Atoms/Atoms";
export const Video = () => {
    const [config, SetConfig] = useRecoilState(CONFIG);
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
    function SL_Reload(
        event: React.ChangeEvent<HTMLSelectElement>,
        option: string
    ) {
        const pre = Gen_pre();
        pre.video.string[option] = event.target.value;
        SetConfig(pre);
    }
    const LoadList = (target: "codecList" | "qualityList" | "defaultList") => {
        const pre: React.ReactElement[] = [];
        const lists = config.video[target];
        for (const key of Object.keys(lists)) {
            pre.push(<option key={key}>{key}</option>);
        }
        const match:{[key:string]:string} = {
            codecList: "codec",
            qualityList: "quality",
            defaultList: "default",
        };
        return (
            <select
                value={config.video.string[target]}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    SL_Reload(e, match[target]);
                }}
            >
                {[...pre]}
            </select>
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
