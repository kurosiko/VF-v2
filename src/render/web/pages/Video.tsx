import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { CONFIG } from "../Atoms/Atoms";
import { useLocation } from "react-router-dom";
import { JSONType } from "../../../Types/VFTypes";
import { config } from "process";
import { Reload } from "../Atoms/CustomHooks";

export const Video = () => {
    const config = useRecoilValue(CONFIG);
    const location = useLocation();
    const Reload = location.state as (
        callback: (dupe: JSONType) => JSONType
    ) => void;
    const LoadList = (target: "codecList" | "qualityList" | "defaultList") => {
        const options = Object.keys(config.video[target]).map((key: string) => {
            return (
                <option key={key} value={config.video[target][key]}>
                    {key}:{config.video[target][key]}
                </option>
            );
        });
        const default_value = config.video.string[target];
        return (
            <>
                <select
                    value={default_value}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                        Reload((dupe) => {
                            dupe.video.string[target];
                            return dupe;
                        });
                    }}
                >
                    {...options}
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
                {["force", "thumbnail", "metadata"].map((option: string) => {
                    return (
                        <div className="checkbox" key={option}>
                            <label className="togglebutton">
                                <input
                                    type="checkbox"
                                    checked={config.video.boolean[option]}
                                    onChange={(event) => {
                                        Reload((dupe) => {
                                            dupe.video.boolean[option] =
                                                event.currentTarget.checked;
                                            return dupe;
                                        });
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
