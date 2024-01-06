import YTDlpWrap from "./dlp"
import path from "path"
export const download = (url:string) => {
    const yt_dlp = new YTDlpWrap(path.resolve("yt-dlp.exe"))
    //yt_dlp.exec([url,"-o","./dlvideos/.mp4"])
}
download("https://www.youtube.com/watch?v=4KDUn3y3Sfw");