import React, { useEffect, useState } from "react";
import "../css/Progress.css";
import { clearInterval } from "timers";
import { Link, useLocation } from "react-router-dom";
import { stat } from "fs";
import { removeAllListeners } from "process";
export const Init = () => {
    const [state, SetState] = useState("");
    window.api.setup((msg: string) => {
        removeAllListeners("setup");
    });
    return (
        <>
            <h1 className="header">Setup</h1>
            <label>
                initialization processing...<br></br>wait please
            </label>
            <label>{state}</label>
            <progress />
        </>
    );
};
