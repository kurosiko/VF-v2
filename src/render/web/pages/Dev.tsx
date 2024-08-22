import { useRecoilState } from "recoil";
import { PROGRESS } from "../Atoms/Atoms";

export const Dev = () => {
    const [progress, SetProgress] = useRecoilState(PROGRESS);
    return (
        <>
            <h1 className="header">Dev</h1>
            <button
                onClick={() => {
                    SetProgress([
                        ...progress,
                        {
                            pid: 1234,
                            has_error: true,
                            percent: 15,
                            title: "test Content",
                            thumbnail:
                                "https://pbs.twimg.com/media/GVbNGgJaUAAA_kU?format=jpg&name=4096x4096",
                        },
                    ]);
                }}
            >
                Add Content on progress
            </button>
        </>
    );
};
