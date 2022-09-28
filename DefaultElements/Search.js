import Helper from "../Helper.js";
function initialize() {
    let searchButton = document.getElementById("searchButton");
    let searchBox = document.getElementById("searchBox");

    searchButton.onclick = function(){
    let query = Helper.encodeQuery({'mangaTitle': searchBox.value});
    window.open(`../MangaSearch/MangaSearch.html?${query}`,'_self');
    }
}

export default{initialize};