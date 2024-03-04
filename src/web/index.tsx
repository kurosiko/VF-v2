import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { App } from "./App";
import { RecoilRoot } from "recoil";
createRoot(document.getElementById("root") as Element).render(
    <HashRouter>
        <RecoilRoot>
            <App />
            <div id="pop" />
        </RecoilRoot>
    </HashRouter>
);
