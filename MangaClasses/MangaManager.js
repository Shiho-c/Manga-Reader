import Manga from './Manga.js';
import Helper from '../Helper.js';

const MangaClass = new Manga();



async function getCovers(mangas) {
    for(let i = 0; i < mangas.data.length; i ++) {
        try {
            let coverID = mangas.data[i].relationships[2].id;
            let mangaTitle = mangas.data[i].attributes.title.en;
            let mangaID = mangas.data[i].id;
            let coverSource = await MangaClass.getCover(coverID);
            Helper.loadPopular(mangaTitle, mangaID, coverSource);
        }
        catch(err) {
            console.log(`Error: ${err}`);
        }
        
    }
    
}

async function getMangas() {

    var url = new URL("https://api.mangadex.org/manga"),
    params = {limit:35, "order[rating]": "desc"};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    let response = await fetch(url);
    let result = await response.json();
    getCovers(result);
}

export default {getCovers, getMangas};