import React from "react";
import {useNavigate, Route, Routes, Link, } from "react-router-dom";
import "./App.css";
import "./css/Back.css"
import "./css/General.css"
import {DL} from "./pages/DL"
import { Error } from "./pages/Error"
import {Option} from "./Option"
import {Atoms} from "./Atoms/Atoms"
export const App = () => {
  const navigate = useNavigate()
  return (
    <>
      <div id="main" draggable="true" onDrop={(event)=>{
      }}>
        <div id="menu">
          <h2>SETTING</h2>
          <button type="button" onClick={()=>{navigate("option/general")}}>General</button>
          <button type="button" onClick={()=>{navigate("option/video")}}>Video</button>
          <button type="button" onClick={()=>{navigate("option/audio")}}>Audio</button>
          <button type="button" onClick={()=>{navigate("option/other")}}>Other</button>
          <button type="button" onClick={()=>{navigate("option/log")}}>Log</button>
            <div className="checkbox">
              <div>
                <label className="togglebutton">
                  <input type="checkbox"/>  
                </label>
              </div>
              <label>Playlist</label>
            </div>
            <div className="checkbox">
              <div>
              <label className="togglebutton">
                <input type="checkbox"/>
              </label>
              </div>
              <label>Audio Only</label>
            </div>
          <Link to={"/"}>Home(dev)</Link>
        </div>
        <div id="inputbox">
            <Routes>
              <Route path="option/*" element={<Option/>}/>
              <Route path="/" element={<DL/>}/>
              <Route path="*" element={<Error/>}/>
            </Routes>
        </div>
      </div>
    </>
  );
};
