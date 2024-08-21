import { Route, Routes } from "react-router-dom";
import { Dev } from "./Dev";
import { General } from "./General";
import { Log } from "./Log";
import { Other } from "./Other";
import { Audio } from "./Audio";
import { DL } from "./DL";
import { Video } from "./Video";
export const Setting = () => {
    return (
        <>
            <Routes>
                <Route path="" element={<DL />} />
                <Route path="dev" element={<Dev />} />
                <Route path="general" element={<General />} />
                <Route path="video" element={<Video />} />
                <Route path="audio" element={<Audio />} />
                <Route path="other" element={<Other />} />
                <Route path="log" element={<Log />} />
            </Routes>
        </>
    );
};
