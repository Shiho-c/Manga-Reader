import Helper from "../Helper.js";
export default class Manga {

    constructor () {
        this.alreadyGotCover = false;
        this.alreadyGotChapters = false;
        this.alreadyGotGenre = false;
        this.coverSource = "";
        this.chaptersText = [];
        this.chaptersID = [];
        this.genres = "";
    }

    async getCover(coverID) {
        if(this.alreadyGotCover) { return this.coverSource};
        let url = `https://api.mangadex.org/cover/${coverID}`;

        const response = await fetch(url, {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
        });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

        let result = await response.json();
        
        let mangaID = result.data.relationships[0].id;
        let fileName = result.data.attributes.fileName;
        this.coverSource = `https://uploads.mangadex.org/covers/${mangaID}/${fileName}`;
        return this.coverSource;
    }

    async getGenreSynopsis(mangaID) {
        if(this.alreadyGotGenre) { return this.genres};
        let url = `https://api.mangadex.org/manga/${mangaID}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
            });
    
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }      
        
        let result = await response.json();
        this.genres = Helper.filterGenres(result);
        return [this.genres, result.data.attributes.description.en];
    }

    async getChapter(mangaID) {
        if(this.alreadyGotChapters) { return this.chaptersText};
        let url = `https://api.mangadex.org/manga/${mangaID}/aggregate`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
            });
    
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        
        let result = await response.json();
        for(let x in result.volumes) {
            for(let y in result.volumes[x].chapters) {
                this.chaptersText.push(`Chapter ${result.volumes[x].chapters[y].chapter}`);
                this.chaptersID.push(`${result.volumes[x].chapters[y].id}`);
            }
        }
        return [this.chaptersText, this.chaptersID];
    }
}
        