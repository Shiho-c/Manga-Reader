import Helper from "../Helper.js";
import MangaManager from "../MangaClasses/MangaManager.js";

const params = Helper.getQueryParams();
let chapterID = params.chapterID;

let page_urls = MangaManager.getPages(chapterID);
page_urls.then(function(result){
    for(let x in result) {
        let page_container = document.querySelector('.images-container');
        let page_image = document.createElement('img');
        page_image.src = result[x];
        //page_image.style.objectFit = "fill";
        page_image.style.minWidth = 800;
        page_container.appendChild(page_image);
    }
});
