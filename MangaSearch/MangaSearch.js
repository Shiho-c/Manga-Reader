import MangaManager from "../MangaClasses/MangaManager.js";
import Helper from "../Helper.js";
import Manga from "../MangaClasses/Manga.js";
function loadSearch(mangaTitle) {
    let searchedResult = MangaManager.searchManga(mangaTitle);
    let searchedContent = document.querySelector(".searched-content");
    while(searchedContent.firstChild){
        searchedContent.removeChild(searchedContent.firstChild);
    }

    searchedResult.then(function(result){
        for(let x in result){
            let manga = new Manga();
            let coverSource = manga.getCover(result[x].mangaCoverID);
            coverSource.then(function(cover) {
                let searchedContainer = document.createElement("searched-container");
                searchedContainer.style.padding = "20px 25px 20px 25px";
                let searchedTitle = document.createElement("p");
                let coverElement = document.createElement("img");

                searchedTitle.textContent = Helper.filterTitle(result[x].mangaTitle);
                coverElement.src = cover;
                coverElement.width = 200;
                coverElement.height = 200;
                coverElement.addEventListener('click', function handleClick(event) {
                    let query = Helper.encodeQuery({'mangaTitle': result[x].mangaTitle, 'mangaID': result[x].mangaID,'mangaCover': cover});
                    window.open(`../MangaPage/MangaPage.html?${query}`,'_self');
            
                  });
                searchedContainer.appendChild(searchedTitle);
                searchedContainer.appendChild(coverElement);
                
                searchedContent.appendChild(searchedContainer);
            });
        }
    })

}
let searchButton = document.getElementById("searchButton");
let searchBox = document.getElementById("searchBox");

searchButton.onclick = function(){
    loadSearch(searchBox.value);
};

const params = Helper.getQueryParams();
loadSearch(params.mangaTitle);
