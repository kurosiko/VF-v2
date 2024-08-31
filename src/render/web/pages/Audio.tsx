import React from "react";
import { useRecoilState } from "recoil";
import { JSONType } from "../../../Types/VFTypes";
import { CONFIG } from "../Atoms/Atoms";

export const Audio = () => {
    const [config, SetConfig] = useRecoilState(CONFIG);
    const Reload = (callback: (dupe: JSONType) => JSONType): void => {
        const dupe = structuredClone(config);
        const altered = callback(dupe);
        SetConfig(altered);
    };
    const LoadList = (target: "codecList" | "qualityList" | "defaultList") => {
        const options = Object.keys(config.audio[target]).map((key: string) => {
            return (
                <option key={key} value={config.audio[target][key]}>
                    {key}:{config.audio[target][key]}
                </option>
            );
        });
        const default_value = config.audio.string[target];
        return (
            <>
                <select
                    value={default_value}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                        Reload((dupe) => {
                            dupe.audio.string[target] =
                                event.currentTarget.value;
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
    const Boolean_List = () => {
        const NameList = {
            force: "force convert",
            thumbnail: "embed thumbnail",
            metadata: "embed metadata",
        };
        type UnionKey = keyof JSONType["audio"]["boolean"];
        const DOMList = (Object.entries(NameList) as [UnionKey, string][]).map(
            ([value, description]) => {
                return (
                    <div className="checkbox">
                        <label className="togglebutton">
                            <input
                                type="checkbox"
                                checked={config.audio.boolean[value]}
                                onChange={(event) => {
                                    Reload((dupe) => {
                                        dupe.audio.boolean[value] =
                                            event.currentTarget.checked;
                                        return dupe;
                                    });
                                }}
                            />
                        </label>
                        <label>
                            {description
                                .split(" ")
                                .map((str: string) => {
                                    return (
                                        str.charAt(0).toUpperCase() +
                                        str.slice(1)
                                    );
                                })
                                .join(" ")}
                        </label>
                    </div>
                );
            }
        );
        return DOMList;
    };

    return (
        <>
            <h1 className="header">Audio</h1>
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
                {Boolean_List()}
            </div>
        </>
    );
};
