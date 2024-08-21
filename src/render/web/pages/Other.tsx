import { useRecoilState } from "recoil";
import { JSONType } from "../../../Types/VFTypes";
import { CONFIG } from "../Atoms/Atoms";

export const Other = () => {
    const [config, SetConfig] = useRecoilState(CONFIG);
    const Reload = (callback: (dupe: JSONType) => JSONType): void => {
        const dupe = structuredClone(config);
        const altered = callback(dupe);
        SetConfig(altered);
    };
    const Boolean_List = () => {
        const NameList = {
            notification: "notification",
            update: "check updates",
            dev: "Developer",
        };
        type ValUnion = keyof typeof NameList;
        const DOMList = Object.entries(NameList).map(([value, description]) => {
            return (
                <div className="checkbox">
                    <label className="togglebutton">
                        <input
                            type="checkbox"
                            checked={config.other[value]}
                            onChange={(event) => {
                                Reload((dupe) => {
                                    dupe.other[value] =
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
                                    str.charAt(0).toUpperCase() + str.slice(1)
                                );
                            })
                            .join(" ")}
                    </label>
                </div>
            );
        });
        return DOMList;
    };

    return (
        <>
            <h1 className="header">Other</h1>
            <div className="options">{Boolean_List()}</div>
        </>
    );
};
