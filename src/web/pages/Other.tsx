import React from "react";
import { JSONType } from "../../functions/VFTypes";
import { useRecoilState } from "recoil";
import { CONFIG } from "../Atoms/Atoms";
export const Other = () => {
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
        pre.other[`${option}`] = event.target.checked;
        SetConfig(pre);
    }
    return (
        <>
            <h1 className="header">Other</h1>
            <div className="options">
                <div className="checkbox">
                    <label className="togglebutton">
                        <input
                            type="checkbox"
                            checked={config.other.notification}
                            onChange={(e) => {
                                Reload(e, "notification");
                            }}
                        />
                    </label>
                    <label>Notification</label>
                </div>
                <div className="checkbox">
                    <label className="togglebutton">
                        <input
                            type="checkbox"
                            checked={config.other.update}
                            onChange={(e) => {
                                Reload(e, "update");
                            }}
                        />
                    </label>
                    <label>Check updates</label>
                </div>
                <div className="checkbox">
                    <label className="togglebutton">
                        <input
                            type="checkbox"
                            checked={config.other.dev}
                            onChange={(e) => {
                                Reload(e, "dev");
                            }}
                        />
                    </label>
                    <label>Developer Mode</label>
                </div>
            </div>
        </>
    );
};
