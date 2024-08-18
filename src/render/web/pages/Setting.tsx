import { Route, Routes } from "react-router-dom";
import { Audio } from "./setting/Audio";
import { Video } from "./setting/Video";
import { General } from "./setting/General";
import { Other } from "./setting/Other";
import { Dev } from "./setting/Dev";
import { Log } from "./Log";
import { useRecoilState } from "recoil";
import { CONFIG } from "../Atoms/Atoms";
export const Setting = () => {
    const [config, SetConfig] = useRecoilState(CONFIG);
    return (
        <>
            <h2>Setting</h2>
            <Routes>
                <Route path="dev"  element={<Dev />} />
                <Route path="general" element={<General />} />
                <Route path="video" element={<Video />} />
                <Route path="audio" element={<Audio />} />
                <Route path="other" element={<Other />} />
                <Route path="log" element={<Log />} />
            </Routes>
        </>
    );
};
