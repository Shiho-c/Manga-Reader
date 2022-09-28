import MangaManager from "../MangaClasses/MangaManager.js";
import Helper from "../Helper.js";

const params = Helper.getQueryParams();
let searchedResult = MangaManager.searchManga(params.mangaTitle);

console.log(searchedResult);
