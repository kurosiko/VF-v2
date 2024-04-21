import React, { LegacyRef, useCallback, useEffect, useRef } from "react";
import "../web/css/Popup.css";
import { JSONType } from "../VFTypes";
import { dictKeys } from "./Types/AllowType";
import { dialog } from "electron";
export const Popup = (
    config: JSONType,
    target: dictKeys,
    from: "video" | "audio"
) => {
    //if (!Object.hasOwn(config, from)) return;
    /*
    const dialog = useCallback((node:LegacyRef<HTMLDialogElement>) => {
        if (!node) return
    },[])
    */
    
    const dialog = useRef(null);

    const useDialog = (dialog_ref: React.RefObject<HTMLDialogElement>) => {
        return {
            open: () => {
                dialog_ref.current?.showModal()
            },
            close: () => {
                console.log(dialog_ref.current?.returnValue)
                dialog_ref.current?.removeAttribute("open");
            },
        };
    };
    const { open, close } = useDialog(dialog);
    useEffect(open, []);
    return (
        <dialog open={false} ref={dialog} className="popup" onClick={(e) => {}}>
            <label>Test</label>
            <div>
                <div className="pop_sl">
                    <select>
                        {Object.keys(config[from][target]).map(
                            (key: string) => {
                                return (
                                    <option className="popup_ops" key={key}>
                                        {Object.values(key)}
                                    </option>
                                );
                            }
                        )}
                    </select>
                </div>
                <div className="pop_btn">
                    <button>Remove</button>
                    <button
                        onClick={(e) => {
                            close();
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </dialog>
    );
    /*
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
    */
};
