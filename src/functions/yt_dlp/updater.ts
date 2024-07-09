async function get(page = 1, perPage = 1) {
    const apiURL =
        "https://api.github.com/repos/yt-dlp/yt-dlp/releases?page=" +
        page +
        "&per_page=" +
        perPage;
    const res = await fetch(apiURL);
    console.log(res.status);
    const version = (await res.json())[0].tag_name;
    
}
get();
