import React, { createElement, useEffect, useRef, useState } from "react";
import { JSONType, Str_Dict } from "../../JsonType";
export const Video = () => {
    return (
        <>
            <h1>This page is stopped</h1>
        </>
    );
    /*
    let _config:JSONType
    let codec_list:Array<string>
    const v_codec = useRef<HTMLSelectElement>(null)
    if (!v_codec){
        return
    }
    window.api.getconfig()
    window.api.sendconfig((config:JSONType)=>{
        console.log(config)
        _config = config
        codec_list = Object.keys(_config.video.codec)
        console.log(codec_list)
        
        }
    )
    return(
        <>
            <h1 className="header">Video</h1>
            <div className="options">
                <div className="combbox">
                    <label>Quality</label>
                    <select>
                        <option>tst</option>
                    </select>
                </div>
                <div className="combbox">
                    <label>Codec</label>
                    <select ref={v_codec}>
                        <option>Tst</option>
                    </select>
                </div>
                <div className="checkbox">
                    <label className="togglebutton">
                        <input type="checkbox"/>
                    </label>
                    <label>Thumbnail</label>
                </div>
                <div className="checkbox">
                    <label className="togglebutton">
                        <input type="checkbox"/>
                    </label>
                    <label>Metadata</label>
                </div>
            </div>
        </>
    )
    */
};
