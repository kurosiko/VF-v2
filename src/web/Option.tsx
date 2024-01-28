import React from "react";
import { Routes, useNavigate, Route } from "react-router-dom";
import { General } from "./pages/General";
import { Video } from "./pages/Video";
import { Audio } from "./pages/Audio";
import { Other } from "./pages/Other";
import { Log } from "./pages/Log";
import { Dev } from "./pages/Dev";
import { useTransitionNavigate } from "./pages/Tran_nav";
export const Option = () => {
    const { transitionNavigate } = useTransitionNavigate();
    return (
        <>
            <Routes>
                <Route path="/general" element={<General />} />
                <Route path="/video" element={<Video />} />
                <Route path="/audio" element={<Audio />} />
                <Route path="/other" element={<Other />} />
                <Route path="/log" element={<Log />} />
                <Route path="/dev" element={<Dev/>}/>
                <Route path="*" element={<h2>In option Error</h2>} />
            </Routes>
            <button
                type="button"
                id="back"
                onClick={() => {
                    transitionNavigate("/")
                }}
            >
                Back to Home
            </button>
        </>
    );
};
