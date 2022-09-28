import Helper from "../Helper.js";
import MangaManager from "../MangaClasses/MangaManager.js";
import Search from "../DefaultElements/Search.js";

Search.initialize();
const params = Helper.getQueryParams();
let chapterID = params.chapterID;

let page_urls = MangaManager.getPages(chapterID);
page_urls.then(function(result){
    for(let x in result) {
        let page_container = document.querySelector('.images-container');
        let page_image = document.createElement('img');
        page_image.src = result[x];
        page_image.width = 800;
        page_image.height = 1280;
        page_container.appendChild(page_image);
    }
});
