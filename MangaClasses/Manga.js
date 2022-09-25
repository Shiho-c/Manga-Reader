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
}