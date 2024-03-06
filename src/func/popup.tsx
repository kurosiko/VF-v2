import React, { useRef, useState } from "react";
import "../web/css/Popup.css";
import { createRoot } from "react-dom/client";
export const Popup = (
    from: "video" | "audio",
    list: "codecList" | "qualityList" | "defaultList"
) => {
    const target = document.getElementById("pop");
    const close = () => {
        root.unmount();
    };
    class Popup extends React.Component {
        key: React.RefObject<HTMLInputElement>;
        name: React.RefObject<HTMLInputElement>;
        constructor(props: {}) {
            super(props);
            this.key = React.createRef<HTMLInputElement>();
            this.name = React.createRef<HTMLInputElement>();
        }

        render(): React.ReactNode {
            return (
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
                                ref={this.name}
                            />
                            <input
                                type="text"
                                className="key"
                                placeholder="key"
                                ref={this.key}
                            />
                        </div>
                        <div className="select">
                            <button
                                className="popup_add"
                                onClick={() => {
                                    if (!this.key.current || !this.name.current)
                                        return;
                                    window.api.ReqAddConfig(
                                        {
                                            [this.name.current.value]:
                                                this.key.current.value,
                                        },
                                        from,
                                        list,
                                        true
                                    );
                                    close();
                                }}
                            >
                                Add
                            </button>
                            <button
                                className="popup_add"
                                onClick={() => {
                                    if (!this.key.current || !this.name.current)
                                        return;
                                    window.api.ReqAddConfig(
                                        {
                                            [this.name.current.value]:
                                                this.key.current.value,
                                        },
                                        from,
                                        list,
                                        false
                                    );
                                    close();
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </>
            );
        }
    }
    if (!target) return;
    const root = createRoot(target);
    root.render(<Popup />);
};
