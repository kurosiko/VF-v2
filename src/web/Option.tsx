import React from "react";
import { Routes, useNavigate, Route } from "react-router-dom";
import { General } from "./pages/General";
import { Video } from "./pages/Video";
import { Audio } from "./pages/Audio";
import { Other } from "./pages/Other";
import { Log } from "./pages/Log";
import { Dev } from "./pages/Dev";
export const Option = () => {
    const navigate = useNavigate();
    return (
        <>
            <Routes>
                <Route path="/general" element={<General />} />
                <Route path="/video" element={<Video />} />
                <Route path="/audio" element={<Audio />} />
                <Route path="/other" element={<Other />} />
                <Route path="/log" element={<Log />} />
                <Route path="/dev" element={<Dev/>}/>
                <Route path="*" element={<h1>/Option but 404</h1>} />
            </Routes>
            <button
                type="button"
                id="back"
                onClick={() => {
                    navigate("/");
                }}
            >
                Back to Home
            </button>
        </>
    );
};
