import { yt_dlp } from "./yt_dlp";
import { Args } from "./yt_dlp.type";
import { describe, expect, test, vi } from "vitest";

describe("yt_dlp", () => {
    const args: Args = {
        yt_dlp: [
            "https://www.youtube.com/watch?v=pD1kVV06tQc",
            "-f",
            "bestvideo+bestaudio",
            "-o",
            "%(title)s.%(ext)s",
        ],
        custom: {
            lyric: true,
            ytmImage: false,
        },
    };
    test("analyze", async () => {
        const ytDlp = new yt_dlp(args);
        const tasks = await ytDlp.analyze();
        expect(tasks).toBeDefined();
    });
});
