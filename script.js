"use strict";
import MangaManager from "./MangaClasses/MangaManager.js";
import Helper from "./Helper.js";

let searchButton = document.getElementById("searchButton");
let searchBox = document.getElementById("searchBox");

searchButton.onclick = function(){
    let query = Helper.encodeQuery({'mangaTitle': searchBox.value});
    window.open(`./MangaSearch/MangaSearch.html?${query}`,'_self');
};

MangaManager.getMangas();
