import { Routes, Route } from "react-router-dom";
import { useRecoilState } from "recoil";
import { CONFIG } from "../Atoms/Atoms";
import { Dev } from "./Dev";
import { General } from "./General";
import { Log } from "./Log";
import { Other } from "./Other";
import { Video } from "./Video";
import { Audio } from "./Audio";
import { DL } from "./DL";
export const Setting = () => {
    const [config, SetConfig] = useRecoilState(CONFIG);
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
