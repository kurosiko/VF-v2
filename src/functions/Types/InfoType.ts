type InfoType = {
    id: string;
    title: string;
    availability: string;
    channel_follower_count: null;
    description: string;
    tags: string[];
    thumbnail: {
        url: string;
        height: number;
        width: number;
        id: string;
        resolution: string;
    }[];
    modified_date: string;
    view_count: number;
    playlist_count: number;
    channel: string;
    channel_id: string;
    uploader_id: string;
    _type: "video" | "playlist";
    entires: {
        format_id: string
        format_note: string
        ext: string
        protocol: string
        acodec: string
        vcodec: string
        url: string
        width: number
        height: number
        fps: number
        rows: number
        columns: number
        fragments: {
            url: string
            duration:number
        }[]
        resolution: string
        aspect_ratio: number
        filesoze_approx: null
        http_headers: {
            "User-Agent": string
            
        }
    }[];
};
