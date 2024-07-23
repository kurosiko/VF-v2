import { expect, test } from "vitest";
import { yt_dlp } from "./yt_dlp";

test("download", async () => {
    const test = new yt_dlp(["https://www.youtube.com/watch?v=6JllTO5r7f0"]);
    await test.analyze();
});
