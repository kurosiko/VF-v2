import { useRef } from "react";
import { useRecoilState } from "recoil";
import { Progress } from "../../../Types/Progress";
import { CONFIG, PROGRESS } from "../Atoms/Atoms";
import "../css/ProgressBar.css";
import { Config } from "../../functions/gen_opts";
import { Download } from "../../../main/functions/download";
export const DL = () => {
    const url = useRef<HTMLInputElement>(null);
    const [config, SetConfig] = useRecoilState(CONFIG);
    const [progress, SetProgress] = useRecoilState(PROGRESS);
    if (!url) return;
    window.api.progress((data) => {
        SetProgress([data, ...progress]);
    });
    window.api.close((pid) => {
        SetProgress(
            progress.filter((item) => {
                return item.pid != pid;
            })
        );
    });
    window.api.error((pid) => {
        SetProgress(
            progress.filter((item) => {
                if (item.pid == pid) item.has_error = true;
                return item;
            })
        );
    });
    window.api.progress((data) => {
        SetProgress([data, ...progress]);
    });
    function download(url: string) {
        window.api.download(new Config(url, config).Gen_opts());
    }
    function load_progress() {
        const queue = progress.map((item: Progress): JSX.Element => {
            return (
                <div
                    className="progress"
                    style={{ background: "rgb(163, 52, 52,0.5)" }}
                    key={item.pid}
                >
                    <div className="thumbnail">
                        <img src={item.thumbnail} />
                    </div>
                    <div className="progress_main">
                        <div className="progress_data">
                            <label className="title">{item.title}</label>
                            <label className="percent">{item.percent}%</label>
                            <label
                                className="pid"
                                style={{
                                    display: config.other.div
                                        ? "block"
                                        : "none",
                                }}
                            >
                                {item.pid}
                            </label>
                        </div>
                        <progress
                            value={item.percent}
                            max={100}
                            className="progressbar"
                        >
                            {item.percent}%
                        </progress>
                    </div>
                </div>
            );
        });
        return queue;
    }
    return (
        <>
            <div
                id="url_input"
                onSubmit={() => {
                    if (url.current?.value) {
                        download(url.current.value);
                        url.current.value = "";
                    }
                }}
                onDoubleClick={async (event) => {
                    navigator.clipboard.readText().then((text) => {
                        if (URL.canParse(text)) {
                            download(text);
                        } else {
                            console.log("Error Toast"); //create a error toast message
                        }
                    });
                }}
            >
                <form>
                    <input
                        type="text"
                        placeholder="Enter URL or Double Click to Paste"
                        ref={url}
                    />
                </form>
            </div>
            <div
                id="space"
                onDrop={(event) => {
                    event.preventDefault();
                    if (event.dataTransfer.getData("text")) {
                        download(event.dataTransfer.getData("text"));
                    }
                }}
                onDragOver={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                }}
            >
                <div id="show_progress">
                    {progress.length == 0 ? (
                        <label>Drop Here!</label>
                    ) : (
                        load_progress()
                    )}
                </div>
            </div>
        </>
    );
};
