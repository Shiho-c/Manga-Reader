import Manga from './Manga.js';
import Helper from '../Helper.js';

const MangaClass = new Manga();

async function getCovers(mangas) {
    for(let i = 0; i < mangas.data.length; i ++) {
        try {
            let coverID = mangas.data[i].relationships[2].id;
            let mangaTitle = mangas.data[i].attributes.title.en;
            let coverSource = await MangaClass.getCover(coverID);
            Helper.loadPopular(mangaTitle, coverSource);
        }
        catch(err) {
            console.log(`Error: ${err}`);
        }
        
    }
    
}

async function getMangas() {

    var url = new URL("https://api.mangadex.org/manga"),
    params = {limit:20};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    console.log(url);
    let response = await fetch(url);
    let result = await response.json();
    getCovers(result);
}

export default {getCovers, getMangas};