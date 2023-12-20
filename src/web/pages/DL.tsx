import React, { useRef, useState } from "react";
import "../css/DL.css";
import "../css/ProgressBar.css";
import { useRecoilState } from "recoil";
import { CONFIG } from "../Atoms/Atoms";
export const DL = () => {
    return (
        <>
            <div id="url_input" onClick={() => {}}>
                <form>
                    <input type="text" placeholder="Enter URL" />
                </form>
            </div>
            <div id="space">
                <div id="show_progress">
                    <label>Drop URL Here!</label>
                </div>
            </div>
        </>
    );
};
