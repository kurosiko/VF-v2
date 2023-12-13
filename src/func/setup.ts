import YTDlpWrap from 'yt-dlp-wrap';
import fs, { copyFileSync } from "fs"
import path from 'path';
import { JSONType } from '../JsonType';
import { error } from 'console';
export const setup = async(config:JSONType)=>{
    if(config.other.update){
        const release = await YTDlpWrap.getGithubReleases().catch(error=>{
            console.log(error.statusMessage)
        })
        if (!config.ytdlp_v==release[0].name){
            await YTDlpWrap.downloadFromGithub().catch(error=>{
                console.log(error.statusMessage)
            })
        }
        if (release){
            return release[0].name
        }else{
            return "sorry,rate limit"
        }
//    }
    }
}
