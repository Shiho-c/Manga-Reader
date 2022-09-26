import Helper from "../Helper.js";
export default class Manga {

    constructor () {
    }

    async getCover(coverID) {
        let url = `https://api.mangadex.org/cover/${coverID}`;
        let response = await fetch(url);
        let result = await response.json();
        
        let mangaID = result.data.relationships[0].id;
        let fileName = result.data.attributes.fileName;
        let coverSource = `https://uploads.mangadex.org/covers/${mangaID}/${fileName}`;
        return coverSource;
    }

    async getGenreSynopsis(mangaID) {
        let url = `https://api.mangadex.org/manga/${mangaID}`;
        let response = await fetch(url);
        let result = await response.json();
        let genres = Helper.filterGenres(result);
        return [genres, result.data.attributes.description.en];
    }

    async getChapter(mangaID) {
        let url = `https://api.mangadex.org/manga/${mangaID}/aggregate`;
        let response = await fetch(url);
        let result = await response.json();
        let chapters = [];
        
        for(let x in result.volumes) {
            let volumes = result.volumes[x];
            for(let chaps in volumes.chapters) {
                chapters.push(`Chapter ${chaps}`)
             }
        }
        return chapters;
    }
}