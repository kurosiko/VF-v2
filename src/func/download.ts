/*
import YTDlpWrap from "yt-dlp-wrap";
import { JSONType } from "../JsonType";
import path from "path";
const yt_dlp = new YTDlpWrap()
export const download = (url:string,config:JSONType)=>{
const BASE_PATH:string = config.dir
let SAVE_PATH:string = BASE_PATH
if (config.general.dl){
    SAVE_PATH = path.join(SAVE_PATH,"dl_videos")
}
if (config.general.playlist){
    SAVE_PATH = path.join(SAVE_PATH,"%(playlist)s")
}
else{
    if (config.general.uploader){
        SAVE_PATH = path.join(SAVE_PATH,"%(uploader)s")
    }
}else{
    console.log("T")
}
SAVE_PATH = path.join(SAVE_PATH,"%(title)s.%(ext)s")
console.log(SAVE_PATH)
yt_dlp
.exec([url,'-o',SAVE_PATH,])
.on('progress', (progress) =>{console.log(progress.percent,progress.totalSize,progress.currentSpeed,progress.eta)})//dom更新
.on('ytDlpEvent', (eventType, eventData)=>console.log(eventType, eventData))
.on('error', (error) => console.error(error))
.on('close', () => console.log('all done'));
}
function waitForThumbnail(url: string) {
    return new Promise<string>((resolve) => {
        yt_dlp.exec(["-i","--get-thumbnail",url]).on('other',(data:string)=>{
        resolve(data);
    });
    })
}
export const get_thumbnail = async (url:string)=>{
    const result= await waitForThumbnail(url);
    return result
}
*/
