import React, { useRef } from "react";
import ReactDOMServer from "react-dom/server";
const render = () => {
    const progress = useRef<number>(0);
    return (
        <>
            <h2>Progress</h2>
            <progress max={100} value={progress.current}></progress>
        </>
    );
};
console.log(ReactDOMServer.renderToStaticMarkup(render()));
