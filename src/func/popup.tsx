import React from "react";
import "../web/css/Popup.css";
import { createRoot } from "react-dom/client";
export const Popup = (
    from: "video" | "audio",
    list: "codecList" | "qualityList" | "defaultList"
) => {
    const target = document.getElementById("pop");
    const close = () => {
        while (target?.firstChild) {
            target.removeChild(target.firstChild);
        }
    };
    const element = (
        <>
            <div className="bg_tr" />
            <div className="popup">
                <button className="popup_add" onClick={close}>
                    Cancel
                </button>
                <div className="popup_input">
                    <input
                        type="text"
                        className="name"
                        placeholder="name"
                    ></input>
                    <input
                        type="text"
                        className="key"
                        placeholder="key"
                    ></input>
                </div>
                <button
                    className="popup_add"
                    onClick={() => {
                        window.api.ReqAddConfig(
                            { test: "test" },
                            from,
                            list,
                            true
                        );
                        close();
                    }}
                >
                    Add
                </button>
            </div>
        </>
    );
    if (!target) return;
    const root = createRoot(target);
    root.render(element);
    return;
};
