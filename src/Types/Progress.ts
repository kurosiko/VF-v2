export interface Progress {
    pid: number;
    title?: string;
    thumbnail?: string;
    percent?: number;
    has_error?: boolean;
    base?: boolean;
}
