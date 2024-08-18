import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { App } from "./App";
import { RecoilRoot } from "recoil";
createRoot(document.getElementById("root") as Element).render(
    <HashRouter>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </HashRouter>
);
