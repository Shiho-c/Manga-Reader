"use strict";
import Manga from "/MangaClasses/Manga.js";
import Helper from '../Helper.js';
import Search from "../DefaultElements/Search.js";

Search.initialize();
const MangaClass = new Manga();
const params = Helper.getQueryParams();

let mangaTitle = params.mangaTitle;
let mangaID = params.mangaID;
let mangaCover = params.mangaCover;
let genreXsynopsis = MangaClass.getGenreSynopsis(mangaID);
let mangaChapters = MangaClass.getChapter(mangaID);

mangaChapters.then(function(mangaChapters) {
  let chaptersText = mangaChapters[0];
  let chaptersID = mangaChapters[1];
  for(let i = 0; i < chaptersText.length; i ++) {
    let chapText = document.createElement("h3");
    chapText.textContent = chaptersText[i];
    chapText.style.borderBottom = "1px solid white";
    chapText.addEventListener('click', function handleClick(event) {
      let query = Helper.encodeQuery({'chapterID': chaptersID[i]});
      window.open(`../MangaChapter/MangaChapter.html?${query}`,'_self');

    });
    document.querySelector(".chapters-container").appendChild(chapText);
  }
})
genreXsynopsis.then(function(result){
  document.querySelector(".manga-genres").textContent = result[0];
  document.querySelector(".manga-synopsis").textContent = result[1];
})

document.querySelector(".manga-title").textContent = mangaTitle;
document.querySelector(".manga-cover").src = mangaCover;

